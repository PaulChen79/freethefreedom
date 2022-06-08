const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userController = {
  getLoginPage: (req, res, next) => {
    try {
      res.render('login')
    } catch (error) {
      next(error)
    }
  },
  getRegisterPage: (req, res, next) => {
    try {
      res.render('register')
    } catch (error) {
      next(error)
    }
  },
  register: async (req, res, next) => {
    try {
      const { fullName, userName, email, password, passwordCheck, phone, emergencyContactName, emergencyContactPhone } = req.body
      if (!fullName || !userName || !email || !password || !passwordCheck || !phone || !emergencyContactName || !emergencyContactPhone) {
        req.flash('warning_msg', '所有欄位都要填寫')
        return res.redirect('back')
      }
      const user = await User.findOne({ $or: [{ email }, { userName }] })
      if (user) {
        req.flash('warning_msg', 'Email或username已經被註冊過囉')
        return res.redirect('back')
      }
      if (password !== passwordCheck) {
        req.flash('warning_msg', '確認密碼不相符')
        return res.redirect('back')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ fullName, userName, email, password: hashedPassword, phone, emergencyContactName, emergencyContactPhone })
      req.flash('success_msg', '成功註冊帳號！')
      return res.redirect('/login')
    } catch (error) {
      next(error)
    }
  },
  login: (req, res, next) => {
    try {
      req.flash('success_msg', '成功登入！')
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    req.logout(error => {
      if (error) return next(error)
      req.flash('success_msg', '成功登出！')
      res.redirect('/')
    })
  }
}

module.exports = userController
