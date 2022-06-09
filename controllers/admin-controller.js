const Course = require('../models/course')

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
      if (!titleZhTW || !titleEn || !titleQuote || !age || !physical || !others || !content || !contentTime || !price || !priceQuote) {
        req.flash('warning_msg', '需要填寫必填項目')
        return res.redirect('back')
      }
      await Course.create({
        titleZhTW,
        titleEn,
        titleQuote,
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
  }
}

module.exports = adminController
