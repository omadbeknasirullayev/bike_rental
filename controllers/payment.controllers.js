const Payment = require("../models/Payment");
const ApiError = require("../errors/ApiError");
//*************************************************************************************
//*************************************************************************************

const addPayment = async (ctx) => {
  try {
    const newPayment = await Payment.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newPayment };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editPayment = async (ctx) => {
  try {
    const editPayment = await Payment.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editPayment == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editPayment };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getPayment = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let payment = await Payment.findOne({ where: { id } });
      if (!payment) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = payment.dataValues;
    } else {
      let payment = await Payment.findAll();
      console.log(payment);
      if (!payment) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = payment;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deletePayment = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await Payment.destroy({ where: { id } });
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
  addPayment,
  editPayment,
  getPayment,
  deletePayment,
};
