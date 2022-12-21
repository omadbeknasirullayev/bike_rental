const Router = require("@koa/router");
const {
  addAds,
  editAds,
  getAds,
  deleteAds,
} = require("../controllers/adsManagment.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice");

const router = new Router();

router.post("/add", userPolice, Validator("adsManagmentSchema"), addAds);
router.put("/edit/:id", userPolice, editAds);
router.get(["/get", "/get/:id"], userPolice, getAds);
router.delete("/delete/:id", userPolice, deleteAds);

module.exports = () => router.routes();
