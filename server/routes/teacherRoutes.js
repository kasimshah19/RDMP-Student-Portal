const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Own routes
router.get('/me', protect, authorizeRoles('teacher'), teacherController.getMe);

// Admin routes
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/all', teacherController.getAllTeachers);
router.patch('/:id/assign-division', teacherController.assignDivision);
router.patch('/:id/assign-subject', teacherController.assignSubject);

module.exports = router;
