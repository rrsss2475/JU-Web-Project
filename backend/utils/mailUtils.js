const express = require("express")
const nodemailer = require("nodemailer")
const moment = require("moment")
require("dotenv").config()

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
})

function getMailBody(order, user, type, receipt_url = "") {
	let body = `<div
  style="padding: 20px; font-family: Rubik, sans-serif"
>
  <div style="display: flex">
    <div style="width: 100%">
      <img src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/logo3.png?alt=media&token=2317f69b-6d2a-49a7-beb8-d7d4a1f237eb" alt="justintime"/>
    </div>
    <div style="width: 100%">
      <p style="float: right">
        <a href="http://justintime24-7.herokuapp.com/myOrders">Your Orders</a> | <a href="http://justintime24-7.herokuapp.com/myBookings">Your Bookings</a>
      </p>
    </div>
  </div>
  <hr style="margin-bottom: -14px" />
  <div style="float: right; width: 100%">
    <p style="float: right">
      <b style="font-size: 21px">${type} ${order.status}</b><br />${type} # <a href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${order._id}">${order._id}</a>
    </p>
  </div>
  <br />`

	/* INITIATED OR SHIPPED */

	if (order.status == "Initiated" || order.status == "Shipped") {
		body += `<div style="width: 100%">
    <h3 style="margin-bottom: -14px; color: green">Hello ${user.name},</h3>
    <p>
      Thank you for your ${type.toLowerCase()}. If you would
      like to view the status of your ${type.toLowerCase()} or make any changes to it,
      please visit Your ${type}s on Justintime.
    </p>
    </div>
  <hr />
  <div style="display: flex; width: 70%">
    <div style="width: 100%">`
		if (type == "Order") {
			body += `<p>Arriving:<br /><b style="color: green">${moment(
				order.toBeDelivered
			).format("DD-MM-YYYY")}</b></p>`
		} else {
			body += `<p>Completion on:<br /><b style="color: green">${moment(
				order.toBeCompleted
			).format("DD-MM-YYYY")}</b></p>`
		}
		body += `</div>
    <div style="width: 100%">
      <p style="float: right">
        Address:<br /><b> ${order.shippingAddress.name},<br />${
			order.shippingAddress.street
		},<br />${order.shippingAddress.city}, ${
			order.shippingAddress.state
		},<br/>${order.shippingAddress.country}, ${order.shippingAddress.zip}</b>
      </p>
    </div>
  </div>
  <button><a style="text-decoration: none" href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${
			order._id
		}">View or manage ${type.toLowerCase()}</a></button>
  <div>
    <h3 style="color: green">${type} Summary</h3>
    <hr style="margin-top: -14px; margin-bottom: -14px" />
    <p>${type} # <a href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${
			order._id
		}">${order._id}</a><br />Placed on ${moment(order.createdAt).format(
			"DD-MM-YYYY"
		)}</p>
    <table>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>`
		if (type == "Order") {
			body += `<tr>
        <td>Total Items</td>
        <td>&emsp;</td>
        <td>${order.orderItems.length}</td>
      </tr>`
		}
		body += `<tr></tr>
      <tr></tr>
      <tr>
        <td><b>Total Price</b></td>
        <td>&emsp;</td>
        <td><b>₹ ${order.totalPrice}</b></td>
      </tr>
    </table>
  </div>
  <hr />
  <div>`
		if (order.isPaid) {
			body += `<p>
      Payment made using ${order.paymentMethod}<br />Check your receipt
      <a href="${receipt_url}">here</a>
    </p>`
		}
	}

	/* DELIVERED */

	if (order.status == "Delivered" || order.status == "Completed") {
		body += `<div style="width: 100%">
    <h3 style="margin-bottom: -14px; color: green">Hello ${user.name},</h3>
    <p>
      Your ${type.toLowerCase()} has been ${order.status.toLowerCase()}.
    </p>
    </div>
  <hr />
  <div style="display: flex; width: 70%">
    <div style="width: 100%">`
		if (type == "Order") {
			body += `<p>Delivered on:<br /><b style="color: green">${moment(
				order.deliveredAt
			).format("DD-MM-YYYY")}</b></p>`
		} else {
			body += `<p>Completed on:<br /><b style="color: green">${moment(
				order.completedAt
			).format("DD-MM-YYYY")}</b></p>`
		}
		body += `</div>
    <div style="width: 100%">
      <p style="float: right">
        Address:<br /><b> ${order.shippingAddress.name},<br />${
			order.shippingAddress.street
		},<br />${order.shippingAddress.city}, ${
			order.shippingAddress.state
		},<br/>${order.shippingAddress.country}, ${order.shippingAddress.zip}</b>
      </p>
    </div>
  </div>
  <button><a style="text-decoration: none" href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${
			order._id
		}">View or manage ${type.toLowerCase()}</a></button>
  <div>
    <h3 style="color: green">${type} Summary</h3>
    <hr style="margin-top: -14px; margin-bottom: -14px" />
    <p>${type} # <a href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${
			order._id
		}">${order._id}</a><br />Placed on ${moment(order.createdAt).format(
			"DD-MM-YYYY"
		)}</p>
    <table>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>`
		if (type == "Order") {
			body += `<tr>
        <td>Total Items</td>
        <td>&emsp;</td>
        <td>${order.orderItems.length}</td>
      </tr>`
		}
		body += `<tr></tr>
      <tr></tr>
      <tr>
        <td><b>Total Price</b></td>
        <td>&emsp;</td>
        <td><b>₹ ${order.totalPrice}</b></td>
      </tr>
    </table>
  </div>
  <hr />
  <div>`
		if (order.isPaid) {
			body += `<p>
      Payment made using ${order.paymentMethod}<br />Check your receipt
      <a href="${receipt_url}">here</a>
    </p>`
		}
	}

	/* CANCELLED */

	if (order.status == "Cancelled") {
		body += `<div style="width: 100%">
      <h3 style="margin-bottom: -14px; color: green">Hello ${user.name},</h3><p>
      Your ${type.toLowerCase()} has been <b>cancelled</b>. You can view the status of your ${type.toLowerCase()} from below button.
    </p>
    </div>
  <button><a style="text-decoration: none" href="http://justintime24-7.herokuapp.com/checkout/${type.toLowerCase()}/${
			order._id
		}">View or manage ${type.toLowerCase()}</a></button>
  <hr/>`
		if (order.isPaid) {
			body += `<p>
    Payment made using ${order.paymentMethod}<br />
    Refund will be initiated in 2-3 business days
  </p>`
		}
	}

	body += `<p>We hope to see you again soon.</p>
    <h2 style="margin-top: -16px">Justintime</h2>
  </div>
</div>`
	return body
}

module.exports = {
	transporter: transporter,
	getMailBody: getMailBody,
}
