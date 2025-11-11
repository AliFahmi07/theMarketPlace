const router = require ('express').Router()

const authCtrl = require("../controllers/auth")


router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", authCtrl.auth_signin_post)


module.exports = router
