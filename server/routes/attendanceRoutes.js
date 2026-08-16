const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

// Teacher Markings
router.post('/mark', authorizeRoles('teacher'), attendanceController.markAttendanceForDivision);

// Scoped fetching points
router.get('/division/:divisionId/date/:date', authorizeRoles('admin', 'teacher'), attendanceController.getAttendanceForDivisionByDate);
router.get('/student/:studentId', authorizeRoles('admin', 'teacher'), attendanceController.getStudentAttendance);
router.get('/report/division/:divisionId', authorizeRoles('admin', 'teacher'), attendanceController.getDivisionAttendanceReport);

// Student Isolated Route
router.get('/me', authorizeRoles('student'), attendanceController.getMyAttendance);

// Admin Globally Allowed Logic
router.get('/low-attendance', authorizeRoles('admin'), attendanceController.getLowAttendanceStudents);

module.exports = router;
