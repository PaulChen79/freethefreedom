const mongoose = require('mongoose')
const Schema = mongoose.Schema
const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  courses: [{
    id: {
      type: String
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Schedule', scheduleSchema)
