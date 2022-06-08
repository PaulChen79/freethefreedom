const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  emergencyContactName: {
    type: String,
    required: true
  },
  emergencyContactPhone: {
    type: String,
    required: true
  },
  IgId: {
    type: String
  },
  LineId: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  schedules: [{
    id: {
      type: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
