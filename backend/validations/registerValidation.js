const joi = require("joi")

const registerValidate = (data) => {
	const schema = joi.object({
		name: joi.string().min(3).required(),
		email: joi.string().required().email(),
		password: joi.string().min(6).required(),
	})
	return schema.validate(data)
}

const updateValidate = (data) => {
	const schema = joi.object({
		_id: joi.string(),
		isAdmin: joi.boolean(),
		name: joi.string().min(3),
		email: joi.string().email(),
		password: joi.string().optional().allow("").min(6),
	})
	return schema.validate(data)
}

module.exports = {
	registerValidate: registerValidate,
	updateValidate: updateValidate,
}
