const path = require("path")
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
app.use("/api/users", userRoute)

const productRoute = require("./routes/productRoutes")
app.use("/api/products", productRoute)

const serviceRoute = require("./routes/serviceRoutes")
app.use("/api/services", serviceRoute)

const orderRoute = require("./routes/orderRoutes")
app.use("/api/orders", orderRoute)

const bookingRoute = require("./routes/bookingRoutes")
app.use("/api/bookings", bookingRoute)

const paymentRoute = require("./routes/paymentRoutes")
app.use("/payment", paymentRoute)

const dirname=path.resolve()
if(process.env.NODE_ENV==='production'){
	app.use(express.static(path.join(dirname,'/frontend/build')))

	app.get('*',(req,res)=>res.sendFile(path.resolve(dirname,'frontend','build','index.html')))
}
else {
	app.use("/", (req, res) => {
		res.send("Server Running....")
	})
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
	)
)
