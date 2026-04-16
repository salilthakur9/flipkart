// Get all items in the user's cart
export const getCart = async (req, res) => {
    const user_id = req.user.id;
    const db = req.app.get('db');

    try {
        const q = `
            SELECT cart.id as cart_id, products.*, cart.quantity 
            FROM cart 
            JOIN products ON cart.product_id = products.id 
            WHERE cart.user_id = ?
        `;
        const [rows] = await db.promise().query(q, [user_id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch cart" });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;
    const db = req.app.get('db');

    try {
        const [existing] = await db.promise().query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?", 
            [user_id, product_id]
        );

        if (existing.length > 0) {
            await db.promise().query(
                "UPDATE cart SET quantity = quantity + ? WHERE id = ?", 
                [quantity, existing[0].id]
            );
        } else {
            await db.promise().query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", 
                [user_id, product_id, quantity]
            );
        }

        res.status(200).json({ message: "Added to cart!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

// 🔥 REMOVE ITEM
export const removeFromCart = async (req, res) => {
    const { cart_id } = req.params;
    const user_id = req.user.id;
    const db = req.app.get('db');

    try {
        await db.promise().query(
            "DELETE FROM cart WHERE id = ? AND user_id = ?",
            [cart_id, user_id]
        );
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ error: "Failed to remove item" });
    }
};

// 🔥 UPDATE QUANTITY
export const updateCartQuantity = async (req, res) => {
    const { cart_id, quantity } = req.body;
    const user_id = req.user.id;
    const db = req.app.get('db');

    try {
        // ❗ prevent invalid quantity
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1" });
        }

        await db.promise().query(
            "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
            [quantity, cart_id, user_id]
        );

        res.json({ message: "Quantity updated" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update quantity" });
    }
};