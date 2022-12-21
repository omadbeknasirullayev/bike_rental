const Joi = require("joi");

const clientSchema = Joi.object({
  avatar: Joi.string(),
  client_name: Joi.string().required(),
  email_address: Joi.string().email().message("Noto'g'ri email kiritildi"),
  contact_number: Joi.string(),
  complete_address: Joi.string(),
  username: Joi.string().max(30).message("30 tadan ko'p harf kiritildi"),
  password: Joi.string(),
  status: Joi.boolean().messages({message: "boolean tipidagi ma'lumot kiritilmadi"}),
});

module.exports = clientSchema;
