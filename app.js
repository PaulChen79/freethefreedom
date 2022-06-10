if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const session = require('express-session')
const flash = (require('connect-flash'))
const methodOverride = require('method-override')
const { getUser } = require('./helpers/auth-helpers')
const usePassport = require('./config/passport')
const path = require('path')
const routes = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defalutLayouts: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
usePassport(app)
app.use(flash())
app.use(methodOverride('_method'))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
