const color = require("colors")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const connectToDB = require("./database/db")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

connectToDB()

app.use(express.json())

app.use(cors())

const userRoute = require("./routes/userRoutes")
app.use("/user", userRoute)

const productRoute = require("./routes/productRoutes")
app.use("/api/products", productRoute)

const serviceRoute = require("./routes/serviceRoutes")
app.use("/api/services", serviceRoute)

app.use(notFound)
app.use(errorHandler)

app.use("/", (req, res) => {
	res.send("Hello")
})

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
	)
)
