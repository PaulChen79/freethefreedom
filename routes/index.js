const express = require('express')
const { generalErrorHandler } = require('../middleware/error-handler')
const router = express.Router()
const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')

router.get('/', courseController.getHomePage)

router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)

router.use('/', generalErrorHandler)

module.exports = router
