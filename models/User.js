const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('CUser', userSchema)
