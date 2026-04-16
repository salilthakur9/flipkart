import Razorpay from 'razorpay';
import crypto from 'crypto';

// 🔥 INIT RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// =======================================================
// ✅ CREATE RAZORPAY ORDER
// =======================================================
export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // in paisa
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    console.error("RAZORPAY ORDER ERROR:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// =======================================================
// ✅ VERIFY PAYMENT + SAVE ORDER
// =======================================================
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    total_amount
  } = req.body;

  const user_id = req.user.id;
  const db = req.app.get('db');

  try {
    // 🔐 VERIFY SIGNATURE
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // ===================================================
    // ✅ CREATE ORDER
    // ===================================================
    const [orderResult] = await db.promise().query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)",
      [user_id, total_amount, "Paid"]
    );

    const order_id = orderResult.insertId;

    // ===================================================
    // ✅ GET CART ITEMS WITH PRICE
    // ===================================================
    const [cartItems] = await db.promise().query(
      `SELECT cart.product_id, cart.quantity, products.price 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = ?`,
      [user_id]
    );

    // ===================================================
    // ✅ INSERT ORDER ITEMS
    // ===================================================
    for (let item of cartItems) {
      await db.promise().query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price_at_purchase) 
        VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    // ===================================================
    // ✅ CLEAR CART
    // ===================================================
    await db.promise().query(
      "DELETE FROM cart WHERE user_id = ?",
      [user_id]
    );

    res.status(200).json({
      message: "Payment successful",
      order_id
    });

  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};


export const getUserOrders = async (req, res) => {
  const user_id = req.user.id;
  const db = req.app.get('db');

  try {
    // 🔥 Get orders
    const [orders] = await db.promise().query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );

    // 🔥 Attach items
    for (let order of orders) {
      const [items] = await db.promise().query(
        `SELECT oi.*, p.title, p.image_url 
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      );

      order.items = items;
    }

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};


export const placeOrder = async (req, res) => {
  const user_id = req.user.id;
  const { total_amount, address } = req.body;
  const db = req.app.get('db');

  try {
    // ✅ Create order
    const [orderResult] = await db.promise().query(
      "INSERT INTO orders (user_id, total_amount, status, address) VALUES (?, ?, ?, ?)",
      [user_id, total_amount, "Paid", address]
    );

    const order_id = orderResult.insertId;

    // ✅ Get cart items with price
    const [cartItems] = await db.promise().query(
      `SELECT cart.product_id, cart.quantity, products.price 
       FROM cart 
       JOIN products ON cart.product_id = products.id 
       WHERE cart.user_id = ?`,
      [user_id]
    );

    // ✅ Insert order items
    for (let item of cartItems) {
      await db.promise().query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price_at_purchase) 
        VALUES (?, ?, ?, ?)`,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    // ✅ Clear cart
    await db.promise().query(
      "DELETE FROM cart WHERE user_id = ?",
      [user_id]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order_id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
};