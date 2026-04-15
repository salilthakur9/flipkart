export const placeOrder = async (req, res) => {
    const user_id = req.user.id;
    const { total_amount } = req.body;
    const db = req.app.get('db');

    try {
        // 1. Create the main order
        const [orderResult] = await db.promise().query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [user_id, total_amount]
        );
        const orderId = orderResult.insertId;

        // 2. Move items from Cart to Order Items
        const [cartItems] = await db.promise().query(
            "SELECT product_id, quantity, price FROM cart JOIN products ON cart.product_id = products.id WHERE user_id = ?",
            [user_id]
        );

        for (let item of cartItems) {
            await db.promise().query(
                "INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)",
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        // 3. Clear the cart
        await db.promise().query("DELETE FROM cart WHERE user_id = ?", [user_id]);

        res.status(201).json({ message: "Order placed successfully!", orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to place order" });
    }
};