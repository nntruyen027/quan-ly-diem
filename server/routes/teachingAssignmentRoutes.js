const express = require('express');
const router = express.Router();
const teachingAssignmentController = require('../controllers/teachingAssignmentController');
const { isAdmin, isAuthorization } = require('../middlewares/authMiddleware');

router.get('', isAuthorization, teachingAssignmentController.getAllTeachingAssignments);

router.get('/class/:classId', isAuthorization, teachingAssignmentController.getTeachingAssignmentByClass);

router.get('/:id', isAuthorization, teachingAssignmentController.getOneTeachingAssignment);

router.post('', isAuthorization, isAdmin, teachingAssignmentController.createTeachingAssignment);

router.put('/:id', isAuthorization, isAdmin, teachingAssignmentController.updateTeachingAssignment);

router.delete('/:id', isAuthorization, isAdmin, teachingAssignmentController.deleteTeachingAssignment);

module.exports = router;
