const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courseSchema = new Schema({
  titleZhTW: {
    type: String,
    required: true
  },
  titleEn: {
    type: String,
    required: true
  },
  titleQuote: {
    type: String,
    required: true
  },
  qualification: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentTime: {
    type: String,
    required: true
  },
  exam: {
    STA: {
      type: String
    },
    DYNB: {
      type: String
    },
    CWTB: {
      type: String
    },
    DNF: {
      type: String
    },
    CNF: {
      type: String
    },
    theory: {
      type: String
    },
    others: {
      type: String
    }
  },
  price: {
    type: Number,
    required: true
  },
  priceQuote: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', courseSchema)
