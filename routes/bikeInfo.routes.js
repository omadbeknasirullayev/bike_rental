const Router = require("@koa/router");
const {
  addBikeInfo,
  editBikeInfo,
  getBikeInfo,
  deleteBikeInfo,
} = require("../controllers/bikeInfo.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", userPolice, Validator("bikeInfoSchema"), addBikeInfo);
router.put("/edit/:id", userPolice, editBikeInfo);
router.get(["/get", "/get/:id"], userPolice, getBikeInfo);
router.delete("/delete/:id", userPolice, deleteBikeInfo);

module.exports = () => router.routes();
