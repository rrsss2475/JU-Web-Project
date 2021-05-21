const connectToDB = require("./database/db");
const dotenv = require("dotenv");
const colors = require("colors");
const Order = require("./models/orderModel");
const Booking = require("./models/bookingModel");

dotenv.config();

connectToDB();

const statusChange = async function () {
  const orders = await Order.updateMany(
    { status: "Inititated" },
    { status: "Initiated" }
  );

  const bookings = await Booking.updateMany(
    { status: "Inititated" },
    { status: "Initiated" }
  );
  console.log(`Data Successfully Imported!`.green.inverse);
};

statusChange();
