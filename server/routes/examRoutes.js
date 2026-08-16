const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/', authorizeRoles('admin'), examController.createExam);
router.get('/', authorizeRoles('admin'), examController.getAllExams);
router.get('/:id', authorizeRoles('admin'), examController.getExamById);
router.get('/classgroup/:classGroupId', authorizeRoles('admin', 'teacher'), examController.getExamsByClassGroup);

module.exports = router;
