const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { getListRoom, addRoom } = require('../controller/roomController')
const { validateAddRooms } = require('../validations/roomValidation')
const route = express.Router()

route.get('/', authMiddleware, getListRoom)
route.post('/', authMiddleware, validateAddRooms, addRoom)

module.exports = route