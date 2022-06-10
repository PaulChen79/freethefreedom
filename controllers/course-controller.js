const Course = require('../models/course')

const courseController = {
  getHomePage: (req, res, next) => {
    try {
      res.render('home')
    } catch (error) {
      next(error)
    }
  },
  getCoursesGirdPage: async (req, res, next) => {
    try {
      const systemQuery = req.query.system || ''
      const courses = await Course.find({ ...systemQuery ? { system: systemQuery } : {} }).lean()
      res.render('courses-grid', { courses, systemQuery })
    } catch (error) {
      next(error)
    }
  },
  getCoursePage: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const course = await Course.findById(courseId).lean()
      const contents = course.content.split(',')
      res.render('course', { course, contents })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = courseController
