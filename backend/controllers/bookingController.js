const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const { User } = require("../models/userModel");
const { getMailBody, transporter } = require("../utils/mailUtils");
const moment = require("moment");

const createBooking = asyncHandler(async (req, res) => {
  const booking = new Booking({
    user: req.user._id,
    bookingItem: req.body.bookingItem,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    totalPrice: req.body.totalPrice,
    toBeCompleted: req.body.toBeCompleted,
    status: "Initiated",
  });

  if (req.body.isPaid) {
    booking.isPaid = req.body.isPaid;
    booking.paidAt = req.body.paidAt;
    booking.paymentResult = req.body.paymentResult;
  }

  const savedBooking = await booking.save();
  if (savedBooking) {
    //console.log(savedBooking)
    const user = await User.findById(savedBooking.user);

    await transporter.sendMail({
      from: `"JUstintime" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: `Booking ${savedBooking._id}`,
      html: getMailBody(savedBooking, user, "Booking", req.body.receipt_url),
    });

    res.json(savedBooking);
    for (let a of user.address) {
      if (savedBooking.shippingAddress._id.equals(a._id)) {
        a.lastUsed = moment().format();
        break;
      }
    }
    let alreadyPresent = false;
    for (let i of user.orderedProducts) {
      // console.log(JSON.stringify(i.product))
      // console.log(JSON.stringify(savedBooking.bookingItem.service))
      if (
        JSON.stringify(i.product) ==
        JSON.stringify(savedBooking.bookingItem.service)
      ) {
        alreadyPresent = true;
        break;
      }
    }
    if (!alreadyPresent) {
      await user.orderedProducts.push({
        product: savedBooking.bookingItem.service,
      });
    }
    await user.save();
  } else {
    res.status(400);
    throw new Error("Failed to create booking");
  }
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });
  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("Booking Not Found");
  }
});

const getAllBookings = asyncHandler(async (req, res) => {
  let allBookings = [];

  let bookings = await Booking.find({
    status: { $nin: ["Cancelled", "Completed"] },
  })
    .sort({ toBeCompleted: "asc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });

  allBookings = [...allBookings, ...bookings];

  bookings = await Booking.find({ status: "Completed" })
    .sort({ deliveredAt: "desc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });
  allBookings = [...allBookings, ...bookings];

  bookings = await Booking.find({ status: "Cancelled" })
    .sort({ createdAt: "desc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "bookingItem.service",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });

  allBookings = [...allBookings, ...bookings];
  res.json(allBookings);
});

const updateBookingToPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.isPaid = true;
    booking.paidAt = Date.now();
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error("Booking Not Found");
  }
});

const updateStatusOfBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    const user = await User.findById(booking.user._id);
    if (req.body.status == "Completed") {
      booking.isCompleted = true;
      booking.completedAt = Date.now();
      if (booking.isPaid == false) {
        booking.isPaid = true;
        booking.paidAt = Date.now();
        booking.paymentMethod = "COD";
      }
      booking.status = req.body.status;
      const updatedBooking = await booking.save();

      await transporter.sendMail({
        from: `"JUstintime" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: `Booking ${updatedBooking._id}`,
        // text: `Order ${savedOrder._id}`,
        html: getMailBody(updatedBooking, user, "Booking"),
      });
      res.json(updatedBooking);
    } else {
      booking.status = req.body.status;
      const updatedBooking = await booking.save();

      await transporter.sendMail({
        from: `"JUstintime" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: `Booking ${updatedBooking._id}`,
        // text: `Order ${savedOrder._id}`,
        html: getMailBody(updatedBooking, user, "Booking"),
      });
      res.json(updatedBooking);
    }
  } else {
    res.status(404);
    throw new Error("Booking Not Found");
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    await booking.remove();
    res.json({ message: "Booking Deleted" });
  } else {
    res.status(404);
    throw new Error("Booking Not Found");
  }
});

module.exports = {
  createBooking: createBooking,
  getBookingById: getBookingById,
  getAllBookings: getAllBookings,
  updateBookingToPaid: updateBookingToPaid,
  updateStatusOfBooking: updateStatusOfBooking,
  deleteBooking: deleteBooking,
};
