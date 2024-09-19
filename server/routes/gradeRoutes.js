const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { isAuthorization, isAdmin, isTeacher } = require('../middlewares/authMiddleware');

// Nhập hoặc cập nhật điểm (giáo viên bộ môn)
router.post('/', isAuthorization, isTeacher, gradeController.createOrUpdateGrade);

// Xem toàn bộ điểm của học sinh (giáo viên chủ nhiệm, giáo viên bộ môn, admin)
router.get('/student', isAuthorization, gradeController.getMyGrades);

router.get('/student/:studentId', isAuthorization, isTeacher, gradeController.getGradesForStudent);

// Xem điểm của học sinh trong lớp theo môn học (giáo viên bộ môn)
router.get('/class/:classId/subject/:subjectId', isAuthorization, isTeacher, gradeController.getGradesForClassAndSubject);

// Xem điểm của học sinh trong lớp theo học kỳ và năm học (giáo viên chủ nhiệm)
router.get('/class/:classId/term', isAuthorization, gradeController.getGradesForClassByTermAndYear);

// Xem toàn bộ điểm của tất cả học sinh (admin)
router.get('/', isAuthorization, isAdmin, gradeController.getAllGrades);

// Xem bảng điểm của học sinh theo học kỳ (giáo viên chủ nhiệm, giáo viên bộ môn, admin)
router.get('/:studentId/term', isAuthorization, gradeController.getGradesByTerm);

// Xem bảng điểm của học sinh theo năm học (giáo viên chủ nhiệm, giáo viên bộ môn, admin)
router.get('/:studentId/academicYear', isAuthorization, gradeController.getGradesByAcademicYear);

module.exports = router;
