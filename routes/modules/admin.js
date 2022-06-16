const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/courses/create', adminController.getCreateCoursePage)
router.get('/courses/:id/edit', adminController.getEditCoursePage)
router.put('/courses/:id', adminController.editCourse)
router.delete('/courses/:id', adminController.deleteCourse)
router.post('/courses', adminController.createCourse)
router.get('/courses', adminController.getCoursesPage)
router.get('/schedules', adminController.getSchedulesPage)
router.get('/schedules/create', adminController.getCreateSchedulePage)
router.post('/schedules', adminController.createSchedule)

module.exports = router
