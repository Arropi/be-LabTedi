const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { getListSubject, addSubject } = require('../controller/subjectController')
const { validateAddSubjects } = require('../validations/subjectValidation')
const route = express.Router()

route.get('/', authMiddleware, getListSubject)
route.post('/', authMiddleware, validateAddSubjects, addSubject)

module.exports = route