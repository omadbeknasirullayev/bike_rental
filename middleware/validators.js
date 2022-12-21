const Validators = require("../validators");

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validation is not exist`);

  return async function (ctx, next) {
    try {
      
      const validated = await Validators[validator].validateAsync(ctx.request.body);
      ctx.request.body = validated
      return next();
      
    } catch (err) {
      console.log(err)
      if (err.isJoi) {
        ctx.status = 400
        ctx.body = {message: err.message, friendlyMsg: "Validation error",}
        return 
      }
      ctx.status = 500
      ctx.body = { friendlyMsg: "Internal error" }
      return
    }
  };
};
