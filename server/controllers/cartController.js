export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // We'll get this from a JWT middleware
    const db = req.app.get('db');

    try {
        // Check if item already exists in cart for this user
        const [existing] = await db.promise().query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?", 
            [user_id, product_id]
        );

        if (existing.length > 0) {
            // Update quantity
            await db.promise().query(
                "UPDATE cart SET quantity = quantity + ? WHERE id = ?", 
                [quantity, existing[0].id]
            );
        } else {
            // Insert new row
            await db.promise().query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", 
                [user_id, product_id, quantity]
            );
        }
        res.status(200).json({ message: "Added to cart successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
};