const express = require('express');
const router = express.Router();
const studentDocumentController = require('../controllers/studentDocumentController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Standard multer setup

// Base prefix: /api/documents/student

// All routes here are student strictly
router.use(protect);
router.use(authorizeRoles('student'));

router.get('/', studentDocumentController.getMyDocuments);
router.post('/', upload.single('documentFile'), studentDocumentController.uploadDocument);

module.exports = router;
