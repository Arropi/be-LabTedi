const express = require('express')
const { androidRegisterValidation, androidLoginValidation } = require('../../validations/userValidation')
const { authRegisterAndroidController, authLoginController } = require('../../controller/authController')
const route = express.Router()

route.post('/register', androidRegisterValidation, authRegisterAndroidController)
route.post('/login', androidLoginValidation, authLoginController)

module.exports = route