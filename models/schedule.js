const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    index: true,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  student: studentSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Schedule', scheduleSchema)
