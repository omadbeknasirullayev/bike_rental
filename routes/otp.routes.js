const Router = require("@koa/router");

const { newOTP, verifyOTP } = require('../controllers/otp.controllers')

const router = new Router();


router.post("/newotp", newOTP)
router.post("/verify", verifyOTP)
// router.delete("/delete", deleteOTP)
// router.get("/:id", getOTPByID)

module.exports = () => router.routes()
  
