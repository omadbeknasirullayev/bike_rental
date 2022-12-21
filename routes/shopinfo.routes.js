const Router = require("@koa/router");
const {
  getShopInfo,
  addShopInfo,
  editShopInfo,
  deleteShopInfo,
} = require("../controllers/shopinfo.controllers");
const userPolice = require("../middleware/userPolice")
const Validator = require("../middleware/validators");

const router = new Router();

router.post("/add", userPolice, Validator("shopinfoSchema"), addShopInfo);
router.put("/edit/:id", userPolice, editShopInfo);
router.get(["/get", "/get/:id"], userPolice, getShopInfo);
router.delete("/delete/:id", userPolice, deleteShopInfo);

module.exports = () => router.routes();
