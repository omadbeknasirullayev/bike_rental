const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string().required().messages({message: "parol kiritmadingiz"}),
    avatar: Joi.string(),
    fullname: Joi.string(),
    contact: Joi.string().required().messages({message: "Tel raqam kiriting"}),
    email: Joi.string().email().messages({message: "Email noto'g'ri kiritildi"}),
    user_category_id: Joi.number(),
    status: Joi.boolean().default(false)
})

module.exports = userSchema