export const placeOrder = async (req, res) => {
  const user_id = req.user.id;
  const { total_amount, address } = req.body;
  const db = req.app.get('db');

  try {
    // 1. Create Order
    const [orderResult] = await db.promise().query(
      "INSERT INTO orders (user_id, total_amount, status, address) VALUES (?, ?, ?, ?)",
      [user_id, total_amount, "Paid", address]
    );

    const orderId = orderResult.insertId;

    // 2. Get Cart Items
    const [cartItems] = await db.promise().query(
      "SELECT * FROM cart WHERE user_id = ?",
      [user_id]
    );

    // 3. Insert Order Items
    for (let item of cartItems) {
      await db.promise().query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    }

    // 4. Clear Cart
    await db.promise().query(
      "DELETE FROM cart WHERE user_id = ?",
      [user_id]
    );

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
};