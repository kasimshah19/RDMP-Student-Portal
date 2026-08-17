const express = require('express');
const router = express.Router();
const { getStats, getPublicNotices } = require('../controllers/publicController');

router.get('/stats', getStats);
router.get('/notices', getPublicNotices);

module.exports = router;
