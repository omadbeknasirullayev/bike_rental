const ShopInfo = require("../models/ShopInfo");
const ApiError = require("../errors/ApiError");

//*************************************************************************************
//*************************************************************************************

const addShopInfo = async (ctx) => {
  try {
    const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    } = ctx.request.body;

    const newShopInfo = await ShopInfo.create({
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    });

    ctx.status = 200;
    ctx.body = { message: "successfully added", Info: newShopInfo };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************
const getShopInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let shopData = await ShopInfo.findOne({ where: { id } });
      if (shopData) {
        ctx.status = 200;
        ctx.body = shopData.dataValues;
        return;
      }
      ctx.status = 500;
      ctx.body = "Not found information by id";
      return;
    }

    let shopData = await ShopInfo.findAll();

    if (!shopData.dataValues) {
      ctx.status = 500;
      ctx.body = "Not found informations";
    }
    ctx.status = 200;
    ctx.body = shopData;
  } catch (error) {}
};

//*************************************************************************************
//*************************************************************************************

const editShopInfo = async (ctx) => {
  try {
    const id = ctx.request.params.id;
    const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      updated_by,
    } = ctx.request.body;

    const editShopInfo = await ShopInfo.update(
      {
        shop_name,
        owner_name,
        address,
        email_address,
        contact_no,
        website,
        updated_by,
      },
      { where: { id } }
    );

    if (editShopInfo == 0) {
      ctx.status = 500;
      return (ctx.body = "Bunday shopInfo mavjud emas");
    }

    console.log(editShopInfo);
    ctx.status = 200;
    ctx.body = editShopInfo;
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteShopInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await ShopInfo.destroy({ where: { id } });
    console.log(deleted);
    ctx.status = 200;
    ctx.body = { message: "deleted", Info: deleted };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

module.exports = {
  getShopInfo,
  addShopInfo,
  editShopInfo,
  deleteShopInfo,
};
