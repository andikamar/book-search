const mongoose = require('mongoose');

module.exports = mongoose.model('favorite', new mongoose.Schema({
  bookId: { type: String, unique: true },
  title: String,
  author: String,
  thumbnail: String,
  rating: Number
}, { timestamps: true }));