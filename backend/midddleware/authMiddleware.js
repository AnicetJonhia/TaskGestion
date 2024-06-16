const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {

        return res.status(401).send({ error: 'Authorization header missing.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        console.log('Token missing');
        return res.status(401).send({ error: 'Please authenticate.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Log pour vérifier le contenu du token

        // Rechercher l'utilisateur par nom d'utilisateur
        const user = await User.findOne({ name: decoded.username });
        if (!user) {
            console.log('User not found');
            return res.status(401).send({ error: 'User not found.' });
        }

        req.user = user; // Définir l'utilisateur complet dans req.user
        console.log('Authenticated user:', req.user); // Log pour vérifier l'utilisateur authentifié
        next();
    } catch (e) {
        console.log('JWT verification failed:', e.message);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authenticate;
