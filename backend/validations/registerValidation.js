const joi = require("joi")

const registerValidate = (data) => {
	const schema = joi.object({
		name: joi.string().min(6).required(),
		email: joi.string().required().email(),
		password: joi.string().min(6).required(),
	})
	return schema.validate(data)
}

module.exports = registerValidate
