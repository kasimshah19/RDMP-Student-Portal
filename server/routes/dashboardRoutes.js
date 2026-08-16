const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

router.get('/admin', authorizeRoles('admin'), dashboardController.getAdminDashboardSummary);
router.get('/teacher', authorizeRoles('teacher'), dashboardController.getTeacherDashboardSummary);
router.get('/student', authorizeRoles('student'), dashboardController.getStudentDashboardSummary);

module.exports = router;
