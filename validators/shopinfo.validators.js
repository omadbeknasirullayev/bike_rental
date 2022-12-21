const Joi =require('joi')

const shopinfoSchema = Joi.object({
    shop_name: Joi.string().required().messages({message: "shop_name kiritmadingiz"}),
    owner_name: Joi.string().required().messages({message: "owner_name kiritmadingiz"}),
    address: Joi.string().required().messages({message: "adress kiritmadingiz"}),
    email_address: Joi.string().email().messages({message: "email to'g'ri kiritilmadi"}),
    contact_no: Joi.string().required().messages({message: "Tel nomer kiritilmadi"}),
    website: Joi.string(),
    updated_by: Joi.number(),
})

module.exports = shopinfoSchema