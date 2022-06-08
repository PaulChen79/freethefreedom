const express = require('express')
const { generalErrorHandler } = require('../middleware/error-handler')
const router = express.Router()
const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const passport = require('passport')

router.get('/', courseController.getHomePage)

router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.post('/register', userController.register)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/logout', userController.logout)

router.use('/', generalErrorHandler)

module.exports = router
