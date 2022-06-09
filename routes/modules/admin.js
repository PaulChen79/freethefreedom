const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/courses/create', adminController.getCreateCoursePage)
router.post('/courses', adminController.createCourse)
router.get('/courses', adminController.getCoursesPage)

module.exports = router
