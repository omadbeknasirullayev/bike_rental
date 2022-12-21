const Router = require("@koa/router");
const { addClient, editClient, geClient, deleteClient } = require("../controllers/client.controllers");

const Validator = require("../middleware/validators");
const userPolice = require("../middleware/userPolice")

const router = new Router();

router.post("/add", Validator("clientSchema"), addClient);
router.put("/edit/:id", editClient);
router.get(["/get", "/get/:id"], userPolice, geClient);
router.delete("/delete/:id", deleteClient);

module.exports = () => router.routes();
