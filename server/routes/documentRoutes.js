const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Base prefix: /api/documents/admin

// All routes here are admin/staff strictly
router.use(protect);
router.use(authorizeRoles('admin', 'staff', 'teacher'));
// Realistically, only admin or office staff should do verification. Let's strictly scope this to admin for sandbox.

router.get('/types', authorizeRoles('admin'), verificationController.getDocumentTypes);
router.post('/types', authorizeRoles('admin'), verificationController.createDocumentType);

router.get('/submissions', authorizeRoles('admin'), verificationController.getAllSubmissions);
router.patch('/submissions/:id/verify', authorizeRoles('admin'), verificationController.verifyDocument);

module.exports = router;
