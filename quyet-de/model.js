const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  content: {
    type: String, // String, Number, Boolean, [type], {} ...
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});
const QuestionsModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionsModel;