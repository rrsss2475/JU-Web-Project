const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { User } = require("../models/userModel");
const moment = require("moment");
const { assert } = require("joi");
const Product = require("../models/productModel");
const { Category, subCategory } = require("../models/categoryModel");

const createOrder = asyncHandler(async (req, res) => {
  const order = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    totalPrice: req.body.totalPrice,
    status: "Inititated",
  });

  if (req.body.isPaid) {
    order.isPaid = req.body.isPaid;
    order.paidAt = req.body.paidAt;
    order.paymentResult = req.body.paymentResult;
  }

  if (moment().hours() > 22) {
    order.toBeDelivered = moment().add(2, "days");
  } else {
    order.toBeDelivered = moment().add(1, "days");
  }

  const savedOrder = await order.save();
  if (savedOrder) {
    res.json(savedOrder);
    const user = await User.findById(savedOrder.user);
    for (let item of savedOrder.orderItems) {
      let alreadyPresent = false;
      for (let i of user.orderedProducts) {
        if (JSON.stringify(i.product) == JSON.stringify(item.product)) {
          alreadyPresent = true;
          break;
        }
      }
      if (!alreadyPresent) {
        await user.orderedProducts.push({ product: item.product });
      }
    }
    await user.save();
  } else {
    res.status(400);
    throw new Error("Failed to create order");
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  let allOrders = [];

  let orders = await Order.find({
    status: { $nin: ["Cancelled", "Delivered"] },
  })
    .sort({ toBeDelivered: "asc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });

  allOrders = [...allOrders, ...orders];

  orders = await Order.find({ status: "Delivered" })
    .sort({ deliveredAt: "desc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });
  allOrders = [...allOrders, ...orders];

  orders = await Order.find({ status: "Cancelled" })
    .sort({ createdAt: "desc" })
    .populate({ path: "user", select: "name email" })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "category", select: "name" },
    })
    .populate({
      path: "orderItems.product",
      select: "name category subCategory",
      populate: { path: "subCategory", select: "name" },
    });

  allOrders = [...allOrders, ...orders];
  res.json(allOrders);
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const updateStatusOfOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.status == "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = req.body.status;
      if (order.isPaid == false) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentMethod = "COD";
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    }
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.remove();
    res.json({ message: "Order Deleted" });
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

module.exports = {
  createOrder: createOrder,
  getOrderById: getOrderById,
  getAllOrders: getAllOrders,
  updateOrderToPaid: updateOrderToPaid,
  updateStatusOfOrder: updateStatusOfOrder,
  deleteOrder: deleteOrder,
};
