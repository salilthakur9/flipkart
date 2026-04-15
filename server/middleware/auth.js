import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        // Look for the token in the headers
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        // Verify the token using the secret in your .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the user data to the request so the cart knows who you are
        req.user = verified; 
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is invalid or expired" });
    }
};

export default auth;