const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  subject: String,
  topic: String,
  difficulty: String,
  marks: Number,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;