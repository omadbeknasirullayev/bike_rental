const Rental = require("../models/Rental");
const ApiError = require("../errors/ApiError");

//*************************************************************************************
//*************************************************************************************

const addRental = async (ctx) => {
  try {
    const newRental = await Rental.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newRental };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editRental = async (ctx) => {
  try {
    const editRental = await Rental.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editRental == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editRental };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const getRental = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let rental = await Rental.findOne({ where: { id } });
      if (!rental) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = rental.dataValues;
    } else {
      let rental = await Rental.findAll();
      console.log(rental);
      if (!rental) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = rental;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteRental = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await Rental.destroy({ where: { id } });
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
  addRental,
  editRental,
  getRental,
  deleteRental,
};
