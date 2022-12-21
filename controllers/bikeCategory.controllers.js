const BikeCategory = require("../models/BikeCategory");
const ApiError = require("../errors/ApiError");
//*************************************************************************************
//*************************************************************************************

const addBikeCategory = async (ctx) => {
  try {
    const newBikeCategory = await BikeCategory.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newBikeCategory };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editBikeCategory = async (ctx) => {
  try {
    const editBikeCategory = await BikeCategory.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editBikeCategory == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editBikeCategory };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getBikeCategory = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let bikeCategory = await BikeCategory.findOne({ where: { id } });
      if (!bikeCategory) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = bikeCategory.dataValues;
    } else {
      let bikeCategory = await BikeCategory.findAll();

      if (!bikeCategory) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = bikeCategory;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteBikeCategory = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await BikeCategory.destroy({ where: { id } });
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
  addBikeCategory,
  editBikeCategory,
  getBikeCategory,
  deleteBikeCategory,
};
