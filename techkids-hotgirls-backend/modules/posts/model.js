const mongoose = require('mongoose');

// author
// view
// like
// createdAt
// content
// imageUrl

const PostSchema = new mongoose.Schema({
  view: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;