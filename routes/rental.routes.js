const Router = require("@koa/router");
const {
  addRental,
  editRental,
  getRental,
  deleteRental,
} = require("../controllers/rental.controllers");
const userPolice = require("../middleware/userPolice")
const Validator = require("../middleware/validators");

const router = new Router();

router.post("/add", userPolice, Validator("rentalSchema"), addRental);
router.put("/edit/:id", userPolice, editRental);
router.get(["/get", "/get/:id"], userPolice, getRental);
router.delete("/delete/:id", userPolice, deleteRental);

module.exports = () => router.routes();
