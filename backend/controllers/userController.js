const { User } = require('../models/userModel');
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    //console.log(registerValidation(req.body));
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists)
            return res.status(400).json('Email already exists');
    }
    catch (err) {
        res.status(400).json(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json('Invalid Email');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass)
            return res.status(400).json('Invalid Password');

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

module.exports.register = register;
module.exports.login = login;