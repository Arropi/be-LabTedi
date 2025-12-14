const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { getReserveAndroidInUse, createReservesUser, getHistoryReserve } = require('../../controller/reservesController');
const { reservesCreateValidation } = require('../../validations/reservesValidation');
const route = express.Router();

route.get('/history', authMiddleware, getHistoryReserve)
route.get('/:inventory_id', authMiddleware, getReserveAndroidInUse)
route.post('/', authMiddleware, reservesCreateValidation, createReservesUser)

module.exports = route;