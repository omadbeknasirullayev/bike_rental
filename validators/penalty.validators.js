const Joi = require('joi')

const penaltySchema = Joi.object({
    rental_id: Joi.number(),
    payment_type: Joi.number(),
    paid_by: Joi.string(),
    payment_date: Joi.date(),
    remarks: Joi.string(),
    user_id: Joi.number(),
})

module.exports = penaltySchema