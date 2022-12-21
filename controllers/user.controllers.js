const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../service/JwtService");
const config = require("config");
const ApiError = require("../errors/ApiError");
const Token = require("../models/Token");
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});

//*************************************************************************************
//*************************************************************************************

const addUser = async (ctx) => {
  try {
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 5);
    const newUser = await User.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newUser };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editUser = async (ctx) => {
  try {
    const editUser = await User.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editUser == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editUser };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let user = await User.findOne({ where: { id } });
      if (!user) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = user.dataValues;
    } else {
      let user = await User.findAll();

      if (!user) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = user;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteUser = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await User.destroy({ where: { id } });
    if (deleted == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday id mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "deleted", Info: deleted };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const login = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const userAgent = ctx.headers["user-agent"];
    if (!username && !password)
      return (ctx.body = { message: "Polyani to'ldiring" });
    let user = await User.findOne({ where: { username } });

    if (!user)
      return (ctx.body = { message: "admin_email yoki parol noto'g'ri" });

    const pass = bcrypt.compareSync(password, user.password);

    if (!pass)
      return (ctx.body = { message: "admin_email yoki parol noto'g'ri" });

    const payload = {
      id: user.id,
      status: user.status,
    };
    const tokens = jwt.generateTokens(payload);
    const devices = detector.detect(userAgent);

    const token = await Token.create({
      user_id: user.id,
      os: devices.os.name,
      device: devices.device.type,
      token: tokens.refreshToken,
    });

    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    ctx.status = 200;
    ctx.body = { token: tokens };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const logout = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get("refreshToken");

    let user;
    if (!refreshToken) return (ctx.body = { message: "Token topilmadi" });
    
    const deleted = await Token.destroy({where: {token: refreshToken}})

    ctx.cookies.set({ refreshToken: null });
    ctx.status = 200;
    ctx.body = { message: "Logout" };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const refreshUserToken = async (ctx) => {
  const { refreshToken } = ctx.cookies.get("refreshToken");
  if (!refreshToken) {
    ctx.status = 400
    return ctx.body = { message: "Token topilmadi" }
  }
  const userDataFromCookie = await jwt.verifyRefresh(refreshToken);

  const tokenDataFromDB = await Token.findOne({where: { token: refreshToken }});
  if (!tokenDataFromDB || !userDataFromCookie) {
    ctx.status = 400
    return ctx.body = { message: "user ro'yxatdan o'tmagan" }
  }
  const user = await User.findOne(userDataFromCookie.id);
  if (!user) {
    ctx.status = 400
    return ctx.body = { message: "ID noto'g'ri" }
  }

  const payload = {
    id: user._id,
    status: user.status
  };

  const tokens = jwt.generateTokens(payload);
  // const token = await Token.update({where: {token: }})  

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.get("refresh_ms"),
    httpOnly: true,
  });
  res.ok(200, tokens); 
};



module.exports = {
  addUser,
  editUser,
  getUser,
  deleteUser,
  login,
  logout,
};
