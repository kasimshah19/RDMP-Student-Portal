const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/class-strength', reportController.getClassWiseStrengthReport);
router.get('/admission-funnel', reportController.getAdmissionFunnelReport);
router.get('/attendance-trend', reportController.getAttendanceTrendReport);

module.exports = router;
