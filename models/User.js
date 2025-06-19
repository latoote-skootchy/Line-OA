const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  lastMessage: String,
  lastActive: Date,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('User', userSchema);
