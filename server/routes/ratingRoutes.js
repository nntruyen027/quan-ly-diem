const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { isAuthorization, isAdmin, } = require('../middlewares/authMiddleware');

// Nhập hoặc cập nhật hạnh kiểm (giáo viên chủ nhiệm)
router.post('/conduct/:classId', isAuthorization, ratingController.createOrUpdateConduct);

// Xem xếp loại của học sinh (học sinh, giáo viên, admin)
router.get('/student', isAuthorization, ratingController.getRatingForStudent);

// Xem xếp loại của tất cả học sinh trong lớp (giáo viên chủ nhiệm, admin)
router.get('/class/:classId', isAuthorization, ratingController.getRatingsForClass);

// Xem xếp loại của học sinh theo năm học (học sinh, giáo viên chủ nhiệm, admin)
router.get('/student/:studentId/academicYear', isAuthorization, ratingController.getRatingForYear);

// Xem toàn bộ xếp loại của tất cả học sinh (admin)
router.get('/', isAuthorization, isAdmin, ratingController.getAllRatings);

module.exports = router;
