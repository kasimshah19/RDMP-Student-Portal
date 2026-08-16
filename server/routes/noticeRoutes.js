const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin'), noticeController.createNotice);
router.get('/', authorizeRoles('admin'), noticeController.getAllNotices);
router.patch('/:id', authorizeRoles('admin'), noticeController.updateNotice);
router.delete('/:id', authorizeRoles('admin'), noticeController.deleteNotice);
router.get('/active', authorizeRoles('teacher', 'student'), noticeController.getActiveNoticesForRole);

module.exports = router;
