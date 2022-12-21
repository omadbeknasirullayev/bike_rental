const Joi = require('joi')

const adsManagmentSchema = Joi.object({
    ad_name: Joi.string().required(),
    shop_id: Joi.number().required(),
    banner_image: Joi.string(),
    description: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.date(),
    ad_location: Joi.string(),
    amount: Joi.number(),   
    user_id: Joi.number().required().messages({message: "user id kiritilmadi"}),
})

module.exports = adsManagmentSchema