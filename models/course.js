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
  },
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
    othersExam: {
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
