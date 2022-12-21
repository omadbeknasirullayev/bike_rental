const BikeInfo = require("../models/BikeInfo");
const ApiError = require("../errors/ApiError");
//*************************************************************************************
//*************************************************************************************

const addBikeInfo = async (ctx) => {
  try {
    const newBikeInfo = await BikeInfo.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newBikeInfo };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editBikeInfo = async (ctx) => {
  try {
    const editBikeInfo = await BikeInfo.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editBikeInfo == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editBikeInfo };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getBikeInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let bikeInfo = await BikeInfo.findOne({ where: { id } });
      if (!bikeInfo) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = bikeInfo.dataValues;
    } else {
      let bikeInfo = await BikeInfo.findAll();
      console.log(bikeInfo);
      if (!bikeInfo) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = bikeInfo;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteBikeInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await BikeInfo.destroy({ where: { id } });
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
  addBikeInfo,
  editBikeInfo,
  getBikeInfo,
  deleteBikeInfo,
};
