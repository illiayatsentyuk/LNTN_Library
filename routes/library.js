const express = require('express');
const libraryController = require('../controllers/library');

const router = express.Router();

router.get('/', libraryController.getIndex);

module.exports = router;
