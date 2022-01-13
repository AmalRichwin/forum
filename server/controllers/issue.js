const mongoose = require('mongoose');
const { logger } = require('../config/logger');

const { IssueModel } = require('../models/issue');

exports.createIssue = async function (req, res) {
  const { title, description, authorId } = req.body;
  try {
    // restriction on the fields
    if (!title || !description || !authorId) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid author'
      });
    }

    const issue = new IssueModel({
      title,
      description,
      authorId
    });

    const result = await issue.save();

    return res.status(201).json({
      status: true,
      message: 'Issue created successfully',
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

exports.addComment = async function (req, res) {
  const { comment, userId, issueId } = req.body;

  try {
    // restriction on the fields
    if (!comment || !userId || !issueId) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required'
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(issueId)
    ) {
      return res.status(400).json({
        status: false,
        message: 'Invalid user or issue'
      });
    }

    await IssueModel.findByIdAndUpdate(
      { _id: issueId },
      { $push: { comments: { comment, userId } } }
    );

    return res.status(201).json({
      status: true,
      message: 'Comment added successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

exports.getAllIssues = async function (req, res) {
  const { page, limit } = req.query;
  const limitPerPage = +limit;

  if (!page || !limit) {
    return res.status(400).json({
      status: false,
      message: 'All fields are required'
    });
  }

  try {
    // to skip the documents based on the page number
    const skipIndex = (+page - 1) * limit;

    const issues = await IssueModel.find({}, {})
      .skip(skipIndex)
      .limit(limitPerPage)
      .populate({
        path: 'authorId',
        select: 'username'
      })
      .sort({
        createdAt: -1
      })
      .exec();

    if (issues.length) {
      const count = await IssueModel.countDocuments();

      const totalPages = Math.ceil(count / limit);

      const hasMore = +page < totalPages;

      return res.send({
        status: true,
        message: 'Issues fetched successfully',
        issues,
        currentPage: +page,
        totalPages,
        hasMore
      });
    }

    return res.send({
      status: false,
      message: 'No issues found',
      issues: [],
      currentPage: +page,
      totalPages: 0,
      hasMore: false,
      totalCount: 0
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

exports.getIssueById = async function (req, res) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid issue'
      });
    }

    const issue = await IssueModel.findById(id)
      .populate({
        path: 'authorId',
        select: 'username'
      })
      .populate({
        path: 'comments.userId',
        select: 'username'
      })
      .exec();

    if (issue) {
      return res.send({
        status: true,
        message: 'Issue fetched successfully',
        issue
      });
    }

    return res.send({
      status: false,
      message: 'No issue found'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};

exports.searchIssues = async function (req, res) {
  const { query } = req.query;

  try {
    const issues = await IssueModel.find(
      {
        $text: {
          $search: query,
          $caseSensitive: false,
          $diacriticSensitive: false,
          $language: 'en'
        }
      },
      {
        title: 1,
        description: 1
      }
    )
      .sort({
        score: {
          $meta: 'textScore'
        }
      })
      .exec();

    if (issues.length) {
      return res.send({
        status: true,
        issues
      });
    }

    return res.status(400).send({
      status: false,
      message: 'No issues found'
    });
  } catch (error) {
    logger.error(`Error in searchIssues: ${error}`);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};
