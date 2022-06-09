const adminController = {
  getCoursesPage: async (req, res, next) => {
    try {
      res.render('admin/courses')
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

  }
}

module.exports = adminController
