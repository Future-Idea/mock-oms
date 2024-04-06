const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDocSchema = new Schema({
  OrderId: { type: String },
  File: {
    FileContent: { type: String },
    FileName: {
      type: String,
      validate: {
        validator: function (v) {
          return v.toLowerCase().endsWith('.png') || v.toLowerCase().endsWith('.pdf')
        }
      }
    }
  }
});

module.exports = mongoose.model('OrderDocument', orderDocSchema)