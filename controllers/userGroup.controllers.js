const UserGroup = require("../models/Usergroup");
const ApiError = require("../errors/ApiError");

//*************************************************************************************
//*************************************************************************************

const addUserGroup = async (ctx) => {
  try {
    console.log(12)
    const newUserGroup = await UserGroup.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newUserGroup };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editUserGroup = async (ctx) => {
  try {
    const editUserGroup = await UserGroup.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editUserGroup == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editUserGroup };
  } catch (error) {
    // console.log(error)
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getUserGroup = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let userGroup = await UserGroup.findOne({ where: { id } });
      if (!userGroup) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = userGroup.dataValues;
    } else {
      let userGroup = await UserGroup.findAll();

      if (!userGroup) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = userGroup;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteUserGroup = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await UserGroup.destroy({ where: { id } });
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

module.exports = {
  addUserGroup,
  editUserGroup,
  getUserGroup,
  deleteUserGroup,
};
