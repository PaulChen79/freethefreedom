// const dayjs = require('dayjs')
// const relativeTime = require('dayjs/plugin/relativeTime')
// dayjs.extend(relativeTime)
module.exports = {
  // currentYear: () => dayjs().year(),
  // relativeTimeFromNow: a => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    console.log(a)
    console.log(b)
    return a === b ? options.fn(this) : options.inverse(this)
  },
  getCartAmount: array => {
    return array.length
  }
}
