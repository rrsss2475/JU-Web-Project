const express = require("express")
const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
})

function getMailBody() {
	const body = "<div></div>"
	return body
}

module.exports = {
	transporter: transporter,
	getMailBody: getMailBody,
}
