const express = require("express")
const color = require('colors');

const app = express();

app.use('/', (req, res) => {
    res.send("Hello");
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold));