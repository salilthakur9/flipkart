export const getAllProducts = async (req, res) => {
    const db = req.app.get('db');
    try {
        const [rows] = await db.promise().query("SELECT * FROM products");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    const db = req.app.get('db');
    try {
        const [rows] = await db.promise().query("SELECT * FROM products WHERE category = ?", [category]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch category products" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    try {
        const [rows] = await db.promise().query("SELECT * FROM products WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product details" });
    }
};