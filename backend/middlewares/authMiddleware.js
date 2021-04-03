const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const auth = async(req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(400).json('Access Denied!');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select('-password');
        next();
    }
    catch (err) {
        res.status(400).json(err);
    }
}

module.exports = auth;