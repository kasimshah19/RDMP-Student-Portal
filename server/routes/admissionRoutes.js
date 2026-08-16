const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again later'
});

// @desc Public Routes
router.post('/apply', apiLimiter, admissionController.submitAdmission);
router.post('/:applicationId/documents', apiLimiter, upload.single('document'), admissionController.uploadDocument);
router.get('/status/:applicationId', apiLimiter, admissionController.getApplicationStatus);

// @desc Admin Secure Routes
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/all', admissionController.getAllAdmissions);
router.get('/:id', admissionController.getAdmissionById);
router.patch('/:id/verify-document/:docId', admissionController.verifyDocument);
router.patch('/:id/approve', admissionController.approveAdmission);
router.patch('/:id/reject', admissionController.rejectAdmission);

module.exports = router;
