const Course = require('../models/course')
const Schedule = require('../models/schedule')

const adminController = {
  getCoursesPage: async (req, res, next) => {
    try {
      const courses = await Course.find().lean()
      res.render('admin/courses', { courses })
    } catch (error) {
      next(error)
    }
  },
  getCreateCoursePage: async (req, res, next) => {
    try {
      res.render('admin/create-course')
    } catch (error) {
      next(error)
    }
  },
  createCourse: async (req, res, next) => {
    try {
      const {
        titleZhTW,
        titleEn,
        titleQuote,
        system,
        age,
        physical,
        others,
        content,
        contentTime,
        image,
        STA,
        DYNB,
        DNF,
        CWTB,
        CNF,
        theory,
        othersExam,
        price,
        priceQuote
      } = req.body
      if (!titleZhTW || !titleEn || !titleQuote || !system || !age || !physical || !others || !content || !contentTime || !price || !priceQuote) {
        req.flash('warning_msg', '需要填寫必填項目')
        return res.redirect('back')
      }
      await Course.create({
        titleZhTW,
        titleEn,
        titleQuote,
        system,
        qualification: {
          age,
          physical,
          others
        },
        content,
        contentTime,
        image,
        exam: {
          STA,
          DYNB,
          DNF,
          CWTB,
          CNF,
          theory,
          othersExam
        },
        price,
        priceQuote
      })
      req.flash('success_msg', '成功創建課程')
      return res.redirect('/admin/courses')
    } catch (error) {
      next(error)
    }
  },
  getEditCoursePage: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const course = await Course.findById(courseId).lean()
      if (!course) throw new Error('課程不存在')
      return res.render('admin/edit-course', { course })
    } catch (error) {
      next(error)
    }
  },
  editCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      const {
        titleZhTW,
        titleEn,
        titleQuote,
        system,
        age,
        physical,
        others,
        content,
        contentTime,
        image,
        STA,
        DYNB,
        DNF,
        CWTB,
        CNF,
        theory,
        othersExam,
        price,
        priceQuote
      } = req.body
      if (!titleZhTW || !titleEn || !titleQuote || !system || !age || !physical || !others || !content || !contentTime || !price || !priceQuote) {
        req.flash('warning_msg', '需要填寫必填項目')
        return res.redirect('back')
      }
      await Course.findOneAndUpdate({ _id: courseId }, {
        titleZhTW,
        titleEn,
        titleQuote,
        system,
        qualification: {
          age,
          physical,
          others
        },
        content,
        contentTime,
        image,
        exam: {
          STA,
          DYNB,
          DNF,
          CWTB,
          CNF,
          theory,
          othersExam
        },
        price,
        priceQuote
      })
      req.flash('success_msg', '成功編輯課程')
      res.redirect('/admin/courses')
    } catch (error) {
      next(error)
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const courseId = req.params.id
      await Course.findByIdAndRemove(courseId)
      req.flash('success_msg', '成功刪除課程')
      res.redirect('/admin/courses')
    } catch (error) {
      next(error)
    }
  },
  getSchedulesPage: async (req, res, next) => {
    try {
      const schedules = await Schedule.find().lean()
      res.render('admin/schedules', { schedules })
    } catch (error) {
      next(error)
    }
  },
  getCreateSchedulePage: async (req, res, next) => {
    try {
      const courses = await Course.find().lean()
      res.render('admin/create-schedule', { courses })
    } catch (error) {
      next(error)
    }
  },
  createSchedule: async (req, res, next) => {
    try {
      console.log(req.body)
      const { name, startDate, endDate, maxPeople, desc, courseId } = req.body
      if (!name || !startDate || !endDate || !maxPeople || !desc || !courseId) {
        req.flash('warning_msg', 'All fields need to fill.')
        return res.redirect('back')
      }
      await Schedule.create({ name, startDate, endDate, maxPeople, desc, courseId })
      req.flash('success_msg', 'Schedule is created')
      res.redirect('/admin/schedules')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
