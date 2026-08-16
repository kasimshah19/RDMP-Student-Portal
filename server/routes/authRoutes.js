const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/admin/login', authController.loginAdmin);
router.post('/teacher/login', authController.loginTeacher);
router.post('/student/login', authController.loginStudent);

// Protected register endpoint (only an existing admin can create another admin)
// For seed script, we just hit the controller directly or use this with a token if we had one
// Wait, the prompt says: "usable by an existing admin, or a one-time seed script"
router.post('/admin/register', protect, authorizeRoles('admin'), authController.registerAdmin);

module.exports = router;
