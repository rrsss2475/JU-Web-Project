const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function getMailBody(order, type) {
  let body = "<div><h4>" + type + " " + order._id + "</h4>";
  body +=
    "<a href=" +
    `http://localhost:3000/checkout/order/${order._id}` +
    ">Track your order</a>";
  body += "<br/> Your Order has been " + order.status;
  body += "<ul>";
  for (const item of order.orderItems) {
    body += `<div style="display:flex;"><img style="height:50px; width:50px;" src="${item.image}" alt="${item.name}"></img><p>&nbsp;${item.name}</p></div>`;
  }
  body += "</ul>";
  body += `<p>Total Amount : ₹ ${order.totalPrice}</p>`;
  body += `<p>Address : ${order.shippingAddress.name}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.zip}</p>`;
  if (order.isPaid) {
    body += `<p>Payment made using ${order.paymentMethod}</p>`;
  }
  body += "</div>";
  return body;
}

module.exports = {
  transporter: transporter,
  getMailBody: getMailBody,
};
