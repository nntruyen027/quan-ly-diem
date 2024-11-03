const express = require('express')
const router = express.Router()
const controller = require('../controllers/accountController')
const {isAdmin, isAuthorization, isTeacher} = require('../middlewares/authMiddleware')
const {uploadFields} = require('../middlewares/fileMiddleware')

router.get('/students', isAuthorization, isTeacher, controller.getAllStudent)
router.get('/admin', isAuthorization, isAdmin, controller.getAllAdmin)
router.get('/teachers', isAuthorization, isTeacher, controller.getAllTeacher)
router.post('/admin', isAuthorization, isAdmin, controller.createOne)
router.get('/admin/:id', isAuthorization, isAdmin, controller.getOne)
router.put('/admin/:id', isAuthorization, isAdmin, controller.updateOne)
router.delete('/admin/:id', isAuthorization, isAdmin, controller.deleteOne)
router.get('/teachers/homeroom', isAuthorization, isTeacher, controller.getHomeroomClass)
router.get('/teachers/assignments', isAuthorization, isTeacher, controller.getAssignmentClasses)

router.get('/students/template', isAuthorization, isAdmin, controller.downloadTemplate); 
router.post('/students/upload', uploadFields(
  [
    {
      name: 'file',
      maxCount: 1,
    }, 
  ]
), isAuthorization, isAdmin, controller.importUsersFromExcel); 


module.exports = router