const Router = require("@koa/router");
const {
  addUser,
  editUser,
  getUser,
  deleteUser,
  login,
  logout,
} = require("../controllers/user.controllers");

const Validator = require("../middleware/validators");

const router = new Router();

router.post("/add", Validator("userSchema"), addUser);
router.put("/edit/:id", editUser);
router.get(["/get", "/get/:id"], getUser);
router.delete("/delete/:id", deleteUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = () => router.routes();
