const joi = require("joi")

const loginValidate = (data) => {
	const schema = joi.object({
		email: joi.string().required().email(),
		password: joi.string().min(6).required(),
	})
	return schema.validate(data)
}

module.exports = loginValidate
