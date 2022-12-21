const Router = require("@koa/router");
const {
  addBikeCategory,
  editBikeCategory,
  getBikeCategory,
  deleteBikeCategory,
} = require("../controllers/bikeCategory.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", userPolice, Validator("bikeCategorySchema"), addBikeCategory);
router.put("/edit/:id", userPolice, editBikeCategory);
router.get(["/get", "/get/:id"], userPolice, getBikeCategory);
router.delete("/delete/:id", userPolice, deleteBikeCategory);

module.exports = () => router.routes();
