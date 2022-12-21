const Client = require("../models/Client");
const generator = require("generate-password");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const ApiError = require("../errors/ApiError");
const {newOTP} = require("./otp.controllers")
const config = require('config')

//*************************************************************************************
//*************************************************************************************

const addClient = async (ctx) => {
  try {
    const client_code = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true,
    });
    ctx.request.body.password = bcrypt.hashSync(ctx.request.body.password, 5);
    ctx.request.body.client_code = client_code;

    const newClient = await Client.create(ctx.request.body);
    phone_number = newClient.dataValues.contact_number

    ctx.status = 200;
    ctx.body = { message: "Muvoffaqiyatli qo'shildi", info: newClient };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const editClient = async (ctx) => {
  try {
    const editClient = await Client.update(ctx.request.body, {
      where: { id: ctx.params.id },
    });
    if (editClient == 0) {
      ctx.status = 500;
      return (ctx.body = { message: "Bunday ma'lumot mavjud emas" });
    }
    ctx.status = 200;
    ctx.body = { message: "Muvaffaqiyatli yangilandi", Info: editClient };
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const geClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (id) {
      let client = await Client.findOne({ where: { id } });
      if (!client) {
        ctx.status = 500;
        return (ctx.body = { message: "Bunday id mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = client.dataValues;
    } else {
      let client = await Client.findAll();
      console.log(client);
      if (!client) {
        ctx.status = 500;
        return (ctx.body = { message: "Malumotlar mavjud emas" });
      }
      ctx.status = 200;
      ctx.body = client;
    }
  } catch (error) {
    ApiError.internal(ctx, { message: error, friendlyMsg: "Serverda xatolik" });
  }
};

//*************************************************************************************
//*************************************************************************************

const deleteClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    const deleted = await Client.destroy({ where: { id } });
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
  addClient,
  editClient,
  geClient,
  deleteClient,
};
