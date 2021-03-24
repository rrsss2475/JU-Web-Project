const express = require("express")
const color = require('colors');
const categories = require('./data/categories')

const app = express();

app.get('/', (req, res) => {
    res.send("Running server...");
})

app.get('/api/categories', (req, res) => {
    res.json(categories);
})

app.get('/api/categories/:id', (req,res) => {
    const category = categories.find((p) => p.id === req.params.id);
    res.json(category);
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold));