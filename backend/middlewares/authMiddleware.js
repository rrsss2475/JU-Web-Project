const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(400).json('Access Denied!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch (err) {
        res.status(400).json(err);
    }
}

module.exports = auth;