const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let Student = new Schema({
  name: {
    type: String,
    required:true
  },
  id_student: {
    type: String,
    required:true,
    unique:true
  },
  mean_grades: {
    type: Number
  },
  semester: {
    type: Number,
    required:true
  }
}, {
  collection: 'Student'
});
module.exports = mongoose.model('Student', Student);