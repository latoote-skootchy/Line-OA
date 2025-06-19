const mongoose = require('mongoose');

const flexSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  primaryUrl: String,
  secondaryUrl: String,
  description: String
});

module.exports = mongoose.model('Flex', flexSchema);
