const Joi = require('joi')

const bikeCategorySchema = Joi.object({
    category_name: Joi.string().max(30).messages({message: "30 tadan ortiq harf kiritish mumkin emas"}),
    description: Joi.string().max(100).messages({message: "100 tadan ortiq harf kiritish mumkin emas"}),
})

module.exports = bikeCategorySchema