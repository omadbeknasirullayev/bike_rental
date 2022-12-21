const Joi = require('joi')

const paymentSchema = Joi.object({
    rental_id: Joi.number().required().messages({message: "Rental_id kirtilmadi"}),
    payment_type: Joi.number(),
    paid_by: Joi.string(),
    payment_date: Joi.date(),
    remarks: Joi.string(),
    user_id: Joi.number().required().messages({message: "user_id kirting"}),
})

module.exports = paymentSchema