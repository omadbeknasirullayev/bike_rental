const Penalty = require("../models/Penalty");
const ApiError = require("../errors/ApiError");

//*************************************************************************************
//*************************************************************************************

const addPenalty = async (ctx) => {
  try {
    const newPenalty = await Penalty.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newPenalty };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editPenalty = async (ctx) => {
  try {
    const editPenalty = await Penalty.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editPenalty == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editPenalty };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getPenalty = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let penalty = await Penalty.findOne({ where: { id } });
      if (!penalty) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = penalty.dataValues;
    } else {
      let penalty = await Penalty.findAll();
      console.log(penalty);
      if (!penalty) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = penalty;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deletePenalty = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await Penalty.destroy({ where: { id } });
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
  addPenalty,
  editPenalty,
  getPenalty,
  deletePenalty,
};
