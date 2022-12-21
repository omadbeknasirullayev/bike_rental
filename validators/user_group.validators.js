const Joi = require('joi')

const userGroupSchema = Joi.object({
    group_name: Joi.string().required().messages({message: "group name kiritilmadi"}),
    description: Joi.string(),
    allow_add: Joi.boolean(),
    allow_edit: Joi.boolean(),
    allow_delete: Joi.boolean(),
    allow_print: Joi.boolean(),
    allow_import: Joi.boolean(),
    allow_export: Joi.boolean(),
})

module.exports = userGroupSchema