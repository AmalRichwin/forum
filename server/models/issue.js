const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const forumSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [CommentSchema]
  },
  {
    timestamps: true
  }
);

const IssueModel = mongoose.model('Issue', forumSchema);

module.exports = {
  IssueModel
};
