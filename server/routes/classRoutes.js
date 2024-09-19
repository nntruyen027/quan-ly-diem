const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { isAdmin, isAuthorization } = require('../middlewares/authMiddleware');

router.get('', isAuthorization, classController.getAllClasses);

router.get('/:id', isAuthorization, classController.getOneClass);

router.get('/:id/students', isAuthorization, classController.getAllStudentByClass);

router.post('', isAuthorization, isAdmin, classController.createClass);

router.put('/:id', isAuthorization, isAdmin, classController.updateClass);

router.delete('/:id', isAuthorization, isAdmin, classController.deleteClass);

module.exports = router;
