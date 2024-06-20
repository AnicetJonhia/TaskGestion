const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decodedToken.userId }; // Ajout des informations utilisateur à la requête

        if (req.body.userId && req.body.userId !== decodedToken.userId) {
            return res.status(400).json({ msg: 'User Id is invalid' });
        } else {
            next();
        }
    } catch (error) {
        console.error("Middleware auth error:", error);
        res.status(401).json({ error: error.message || 'Unauthorized Token' });
    }
};
