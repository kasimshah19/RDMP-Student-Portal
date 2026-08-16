const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('admin'));

router.route('/')
    .get(classController.getClasses)
    .post(classController.createClass);

router.route('/divisions')
    .post(classController.createDivision);

router.route('/subjects')
    .get(classController.getSubjects)
    .post(classController.createSubject);

module.exports = router;
