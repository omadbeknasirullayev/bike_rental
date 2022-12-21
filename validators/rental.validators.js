const Joi = require('joi')

const rentalSchema = Joi.object({
    bike_id: Joi.number().required().messages({message: "Bike_id kiritilmadi"}),
    client_id: Joi.number().required().messages({message: "client_id kirtitilmadi"}),
    rental_start_date: Joi.date(),
    rental_end_date: Joi.date(),
    total_amount: Joi.number(),
    payment_status: Joi.boolean(),
    rental_status: Joi.boolean(),
    remarks: Joi.string(),
    user_id: Joi.number().required().messages({message: "user_id kiritilmadi"}),
})

module.exports = rentalSchema