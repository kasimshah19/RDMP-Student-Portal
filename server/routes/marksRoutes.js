const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/enter', authorizeRoles('teacher'), marksController.enterMarksForDivision);
router.get('/division/:divisionId/exam/:examId/subject/:subjectId', authorizeRoles('admin', 'teacher'), marksController.getMarksForDivisionExamSubject);
router.get('/student/:studentId/exam/:examId', authorizeRoles('admin', 'teacher', 'student'), marksController.getStudentExamResult);
router.get('/me', authorizeRoles('student'), marksController.getMyResults);
router.get('/marksheet/:studentId/:examId', authorizeRoles('admin', 'student'), marksController.generateMarksheet);
router.get('/summary/division/:divisionId/exam/:examId', authorizeRoles('admin', 'teacher'), marksController.getDivisionExamSummary);

module.exports = router;
