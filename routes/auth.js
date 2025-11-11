router = require('express').Router()

const authCtrl = require('../controllers/auth')

router.get('../views/auth/sign-up.ejs', authCtrl.auth_signup_get)
router.post('../views/auth/sign-up.ejs', authCtrl.auth_signup_post)
