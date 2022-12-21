const Router = require("@koa/router");
const {
  addPayment,
  editPayment,
  getPayment,
  deletePayment,
} = require("../controllers/payment.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", userPolice, Validator("paymentSchema"), addPayment);
router.put("/edit/:id", userPolice, editPayment);
router.get(["/get", "/get/:id"], userPolice, getPayment);
router.delete("/delete/:id", userPolice, deletePayment);

module.exports = () => router.routes();
