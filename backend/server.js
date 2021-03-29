const color = require('colors');
const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const connectToDB = require('./database/db');
connectToDB();

app.use(express.json());

app.use(cors());

const userRoute = require('./routes/user');
app.use('/user', userRoute);

app.use('/', (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold));