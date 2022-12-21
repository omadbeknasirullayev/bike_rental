const jwt = require("../service/JwtService");
const ApiError = require("../errors/ApiError");
const userGroup = require("../models/Usergroup");
module.exports = async function (ctx, next) {
  if (ctx.method === "OPTIONS") {
    return next();
  }

  try {
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      return (ctx.body = { message: "User ro'xatdan o'tmagan" });
    }

    const token = authorization.split(" ")[1];
    if (!token) return (ctx.body = { message: "User ro'xatdan o'tmagan" });
    const { user_category_id } = await jwt.verifyAccess(token);
    let allowed = await userGroup.findOne({ where: { id: user_category_id } });
    allowed = allowed.dataValues;
    if (!allowed.allow_add && !allowed.allow_edit && !allowed.allow_delete)
      return (ctx.body = { message: "Sizga ruxsat etilmagan" });
    return next();
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
    return (ctx.body = { message: "User ro'yxatdan o'tmagan" });
  }
};
