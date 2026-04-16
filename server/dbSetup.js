import mysql from "mysql2/promise";

const connectionString = "mysql://root:BHsYiWYpAbsrKJOUyBssMNJZiLaScrPl@switchback.proxy.rlwy.net:11209/railway";
const setupDatabase = async () => {
  try {
    const db = await mysql.createConnection(connectionString);
    console.log("✅ Connected to Railway DB");

    // 🔥 TABLES
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        otp VARCHAR(10),
        is_verified BOOLEAN DEFAULT 0
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(50),
        price DECIMAL(10,2),
        original_price DECIMAL(10,2),
        discount INT,
        rating FLOAT,
        reviews INT,
        image_url VARCHAR(100),
        description TEXT,
        stock INT
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        quantity INT
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total_amount DECIMAL(10,2),
        status VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        quantity INT,
        price_at_purchase DECIMAL(10,2)
      )
    `);

    // 🔥 CLEAR OLD DATA
    await db.execute("DELETE FROM products");

    // 🔥 INSERT PRODUCTS
    await db.execute(`
      INSERT INTO products (title, category, price, original_price, discount, rating, reviews, image_url, description, stock)
      VALUES
      ('Nike Air Jordan 1 Retro High', 'fashion', 15995, 18995, 15, 4.9, 2100, 'shoe1', 'Iconic sneakers', 10),
      ('Adidas Ultraboost Light', 'fashion', 12999, 18999, 31, 4.7, 850, 'shoe2', 'Lightweight running shoes', 10),
      ('Puma RS-X Efekt Reflective', 'fashion', 6499, 9999, 35, 4.3, 420, 'shoe3', 'Retro style', 10),
      ('Reebok Classic Leather Pro', 'fashion', 4599, 6999, 34, 4.5, 900, 'shoe4', 'Minimalist design', 10),
      ('New Balance 574 Core', 'fashion', 7999, 8999, 11, 4.6, 1100, 'shoe5', 'Timeless style', 10),

      ('Nivia Professional Knee Cap', 'sports', 499, 899, 44, 4.3, 1200, 'support1', 'Pain relief knee support', 10),
      ('Nike Jordan Basketball', 'sports', 2499, 3500, 28, 4.8, 850, 'support2', 'High-grip basketball', 10),
      ('Insulated Water Bottle', 'sports', 899, 1299, 30, 4.5, 3200, 'support3', 'Cold for 24 hours', 10),
      ('Running Shoes Accessories', 'sports', 299, 599, 50, 4.1, 450, 'support4', 'Laces and insoles', 10),
      ('Dry-Fit Sports Jersey', 'sports', 799, 1499, 46, 4.6, 2100, 'support5', 'Performance fabric', 10),

      ('A Game of Thrones - George R. R. Martin', 'books', 499, 799, 38, 4.9, 5000, 'book1', 'Epic fantasy novel', 10),
      ('It Ends With Us - Colleen Hoover', 'books', 399, 599, 33, 4.7, 4200, 'book2', 'Emotional romance novel', 10),
      ('Atomic Habits - James Clear', 'books', 599, 899, 33, 4.8, 8000, 'book3', 'Build good habits', 10),
      ('Harry Potter Box Set', 'books', 2999, 4999, 40, 4.9, 10000, 'book4', 'Complete series', 10),
      ('Ikigai - Hector Garcia', 'books', 299, 499, 40, 4.6, 3500, 'book5', 'Japanese life philosophy', 10)
    `);

    console.log("🔥 Database fully ready (tables + products)");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

setupDatabase();