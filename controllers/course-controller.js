const courseController = {
  getHomePage: (req, res, next) => {
    try {
      res.render('home')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = courseController
