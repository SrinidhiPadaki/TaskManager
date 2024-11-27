const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        req.userId = decoded.id;  // Attach the user ID to the request object
        next();  // Pass control to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
