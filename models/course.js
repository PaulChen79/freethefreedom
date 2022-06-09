const mongoose = require('mongoose')
const Schema = mongoose.Schema

const qualifactionSchema = new Schema({
  age: {
    type: String,
    required: true
  },
  physical: {
    type: String,
    required: true
  },
  others: {
    type: String
  }
})

const examSchema = new Schema({
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
  othersExam: {
    type: String
  }
})

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
  qualification: qualifactionSchema,
  content: {
    type: String,
    required: true
  },
  contentTime: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  exam: examSchema,
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
