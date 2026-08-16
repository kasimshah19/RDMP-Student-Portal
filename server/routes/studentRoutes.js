const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Student own routes
router.get('/me', protect, authorizeRoles('student'), studentController.getMe);
router.get('/profile', protect, authorizeRoles('student'), studentController.getMe);
router.patch('/profile', protect, authorizeRoles('student'), studentController.updateProfile);
router.patch('/profile/password', protect, authorizeRoles('student'), studentController.updatePassword);
router.get('/attendance', protect, authorizeRoles('student'), studentController.getStudentAttendance);
router.get('/examinations', protect, authorizeRoles('student'), studentController.getStudentExaminations);
router.get('/timetable', protect, authorizeRoles('student'), studentController.getStudentTimetable);
router.get('/fees', protect, authorizeRoles('student'), studentController.getStudentFees);
router.get('/library', protect, authorizeRoles('student'), studentController.getStudentLibrary);
router.get('/leave', protect, authorizeRoles('student'), studentController.getStudentLeave);


// Admin routes
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/all', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.patch('/:id/assign-division', studentController.assignDivision);

module.exports = router;
