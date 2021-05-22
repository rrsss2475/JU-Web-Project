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

function getMailBody(order, type) {
	let body = "<div><h3>" + type + " " + order._id + "</h3>"
	body +=
		"<a href=" +
		`http://localhost:3000/checkout/order/${order._id}` +
		`>Track your ${type}</a>`

	body += `<h4>Your ${type} has been ${order.status}</h4>`

	if (order.status == "Initiated" || order.status == "Shipped") {
		if (type == "Order") {
			body += `<p>Delivery Date: ${moment(order.toBeDelivered).format(
				"DD-MM-YYYY"
			)}</p>`
		} else {
			body += `<p>Completion Date: ${moment(order.toBeCompleted).format(
				"DD-MM-YYYY"
			)}</p>`
		}
	} else if (order.status == "Delivered" || order.status == "Completed") {
		if (type == "Order") {
			body += `<p>Delivery Date: ${moment(order.deliveredAt).format(
				"DD-MM-YYYY"
			)}</p>`
		} else {
			body += `<p>Completion Date: ${moment(order.completedAt).format(
				"DD-MM-YYYY"
			)}</p>`
		}
	}

	if (order.status != "Cancelled") {
		body += "<ul>"
		if (type == "Order") {
			for (const item of order.orderItems) {
				body += `<div style="display:flex;"><img style="height:50px; width:50px;" src="${item.image}" alt="${item.name}"></img><p>&nbsp;&nbsp;&nbsp;&nbsp;${item.name}</p></div>`
			}
		} else {
			body += `<div style="display:flex;"><img style="height:50px; width:50px;" src="${order.bookingItem.image}" alt="${order.bookingItem.name}"></img><p>&nbsp;&nbsp;&nbsp;&nbsp;${order.bookingItem.name}</p></div>`
		}
		body += "</ul>"
		body += `<p>Total Amount : ₹ ${order.totalPrice}</p>`
		body += `<p>Address : ${order.shippingAddress.name}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.zip}</p>`
		if (order.isPaid) {
			body += `<p>Payment made using ${order.paymentMethod}</p>`
		}
	} else {
		if (order.isPaid) {
			body += `<p>Refund will be initiated in 2-3 business days</p>`
		}
	}
	body += "</div>"
	return body
}

module.exports = {
	transporter: transporter,
	getMailBody: getMailBody,
}
