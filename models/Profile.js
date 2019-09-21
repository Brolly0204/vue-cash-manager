const mongoose = require('mongoose')

const { Schema } = mongoose

const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: { // 收入
    type: String,
    required: true
  },
  expend: { // 支出
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Profile', ProfileSchema)
