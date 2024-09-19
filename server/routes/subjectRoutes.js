const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { isAdmin, isAuthorization } = require('../middlewares/authMiddleware');

router.get('', isAuthorization, subjectController.getAllSubjects);

router.get('/:id', isAuthorization, subjectController.getOneSubject);

router.post('', isAuthorization, isAdmin, subjectController.createSubject);

router.put('/:id', isAuthorization, isAdmin, subjectController.updateSubject);

router.delete('/:id', isAuthorization, isAdmin, subjectController.deleteSubject);

module.exports = router;
