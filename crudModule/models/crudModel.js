const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crudSchema = new Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Crud', crudSchema);
