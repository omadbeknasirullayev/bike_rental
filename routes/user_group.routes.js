const Router = require("@koa/router");
const { addUserGroup, editUserGroup, getUserGroup, deleteUserGroup } = require("../controllers/userGroup.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", userPolice, Validator("userGroupSchema"), addUserGroup);
router.put("/edit/:id", userPolice, editUserGroup);
router.get(["/get", "/get/:id"], userPolice, getUserGroup);
router.delete("/delete/:id", userPolice, deleteUserGroup);

module.exports = () => router.routes();
