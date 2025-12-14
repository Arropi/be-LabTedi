const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { getAndroidInventories } = require('../../controller/inventoryController');
const route = express.Router();

route.get('/', authMiddleware, getAndroidInventories)

module.exports = route;