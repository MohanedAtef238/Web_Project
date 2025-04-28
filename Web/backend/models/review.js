const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: {type: String, required: true, ref: 'User'},
  bookId: {type: String, required: true, ref: 'Book'},
  //rating: {type: Number, required: true, min: 1, max: 5}, // some light validation for some fields where appropriate, but we'll still need to validate the data in the frontend and backend.
  //title: {type: String, required: true, trim: true, maxlength: 100},
  content: {type: String, required: true, trim: true},
  // likes: {type: Number, default: 0},
  //isVerifiedPurchase: {type: Boolean, default: false},
  // helpfulVotes: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  // updatedAt: {type: Date, default: Date.now}
}, {
  timestamps: true // helps in sorting and what not
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 