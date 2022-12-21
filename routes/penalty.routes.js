const Router = require("@koa/router");
const {
  addPenalty,
  editPenalty,
  getPenalty,
  deletePenalty,
} = require("../controllers/penalty.controllers");
const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", userPolice, Validator("penaltySchema"), addPenalty);
router.put("/edit/:id", userPolice, editPenalty);
router.get(["/get", "/get/:id"], userPolice, getPenalty);
router.delete("/delete/:id", userPolice, deletePenalty);

module.exports = () => router.routes();
