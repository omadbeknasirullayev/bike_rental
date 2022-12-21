const AdsManagment = require("../models/AdsManagment");
const ApiError = require("../errors/ApiError");

//*************************************************************************************
//*************************************************************************************

const addAds = async (ctx) => {
  try {
    const newAdds = await AdsManagment.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newAdds };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editAds = async (ctx) => {
  try {
    const editAds = await AdsManagment.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editAds == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editAds };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getAds = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let ads = await AdsManagment.findOne({ where: { id } });
      if (!ads) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = ads.dataValues;
    } else {
      let ads = await AdsManagment.findAll();
      console.log(ads);
      if (!ads) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = ads;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteAds = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await AdsManagment.destroy({ where: { id } });
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
  addAds,
  editAds,
  getAds,
  deleteAds,
};
