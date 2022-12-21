const Joi = require("joi");

const bikeInfoSchema = Joi.object({
  bike_category_id: Joi.number()
    .required()
    .messages({ message: "Bike category kiritilmadi" }),
  shop_id: Joi.number().required().messages({ message: "Shop id kiritilmadi" }),
  bike_name: Joi.string()
    .max(30)
    .messages({ message: "30 tadan ko'p harf kiritildi" })
    .required()
    .messages({ message: "Bike name kiritilmadi" }),
  specs: Joi.string(),
  rent_price: Joi.number()
    .required()
    .messages({ message: "rent price kiritilmadi" }),
  availability: Joi.boolean(),
  user_id: Joi.number()
    .required()
    .messages({ message: "user_id kiritilmadi" }),
});

module.exports = bikeInfoSchema;
