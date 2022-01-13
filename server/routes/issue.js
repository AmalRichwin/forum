const express = require('express');
const {
  addComment,
  createIssue,
  getAllIssues,
  getIssueById,
  searchIssues
} = require('../controllers/issue');

const router = express.Router();

router.post('/create', createIssue);
router.post('/addcomment', addComment);
router.get('/', getAllIssues);
router.get('/:id', getIssueById);
router.get('/search/all', searchIssues);

module.exports = router;
