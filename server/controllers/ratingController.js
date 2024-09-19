const Rating = require('../models/Rating'); // Import mô hình Rating để quản lý hạnh kiểm và xếp loại
const Grade = require('../models/Grade');
const User = require('../models/User');
const Class = require('../models/Class');
const TeachingAssignment = require('../models/TeachingAssignment');

// Giáo viên chủ nhiệm nhập hoặc cập nhật hạnh kiểm cho học sinh theo học kỳ và năm học
exports.createOrUpdateConduct = async (req, res) => {
  const { studentId, term, academicYear, conduct } = req.body;
  const teacherId = req.user.id; // Lấy ID giáo viên chủ nhiệm từ thông tin xác thực
  const classId = req.params.classId;

  try {
    const isClassTeacher = await checkIfClassTeacher(teacherId, classId);
    if (!isClassTeacher) {
      return res.status(403).json({ error: 'Bạn không có quyền nhập hạnh kiểm cho lớp này.' });
    }

    let rating = await Rating.findOne({ student: studentId, term, academicYear });
    if (rating) {
      rating.conduct = conduct; // Cập nhật hạnh kiểm
      await rating.determineRating(); // Tự động xếp loại sau khi cập nhật
      await rating.save();
      res.status(200).json({ data: rating });
    } else {
      rating = new Rating({
        student: studentId,
        term,
        academicYear,
        conduct,
      });
      await rating.determineRating(); // Xếp loại
      await rating.save();
      res.status(201).json({ data: rating });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Học sinh xem điểm và xếp loại của chính mình
exports.getRatingForStudent = async (req, res) => {
  const studentId = req.user.id; // Lấy ID học sinh từ thông tin xác thực
  const { term, academicYear } = req.query;

  try {
    const rating = await Rating.findOne({ student: studentId, term, academicYear });
    if (!rating) {
      return res.status(404).json({ error: 'Chưa có dữ liệu xếp loại cho học sinh.' });
    }

    // Retrieve grades for each subject the student is enrolled in
    const grades = await Grade.find({ student: studentId, term, academicYear }).populate('subject');
    const subjectScores = grades.map(grade => ({
      subject: grade.subject.name,
      averageScore: grade.averageScore
    }));

    res.status(200).json({
      data: {
        conduct: rating.conduct || 'Chưa có hạnh kiểm',
        rating: rating.rating || 'Chưa xếp loại',
        averageScore: rating.averageScore || 0,
        subjectScores
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Giáo viên chủ nhiệm hoặc admin xem xếp loại của tất cả học sinh trong lớp
exports.getRatingsForClass = async (req, res) => {
  const { classId } = req.params;
  const { term, academicYear } = req.query;
  const teacherId = req.user.id; // Lấy ID giáo viên từ thông tin xác thực

  try {
    const isClassTeacher = await checkIfClassTeacher(teacherId, classId);
    if (!isClassTeacher && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Bạn không có quyền xem xếp loại cho lớp này.' });
    }

    const students = await User.find({ class: classId });
    const ratings = await Promise.all(
      students.map(async (student) => {
        const rating = await Rating.findOne({ student: student._id, term, academicYear });
        // Retrieve grades for each subject the student is enrolled in
        const grades = await Grade.find({ student: student._id, term, academicYear }).populate('subject');
        const subjectScores = grades.map(grade => ({
          subject: grade.subject.name,
          averageScore: grade.averageScore
        }));

        return {
          student: {
            _id: student._id,
            name: student.fullname,
          },
          rating: rating?.rating || 'Chưa xếp loại',
          conduct: rating?.conduct || 'Chưa có hạnh kiểm',
          averageScore: rating?.averageScore || 0,
          subjectScores
        };
      })
    );

    res.status(200).json({ data: ratings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Admin xem toàn bộ điểm và xếp loại của tất cả học sinh trong trường
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate('student').populate('class');
    res.status(200).json({ data: ratings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Học sinh xem điểm và xếp loại cho một năm học cụ thể
exports.getRatingForYear = async (req, res) => {
  const studentId = req.user.id; // Lấy ID học sinh từ thông tin xác thực
  const { academicYear } = req.query;

  try {
    const ratings = await Rating.find({ student: studentId, academicYear });
    if (ratings.length === 0) {
      return res.status(404).json({ error: 'Chưa có dữ liệu xếp loại cho học sinh.' });
    }
    res.status(200).json({ data: ratings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Kiểm tra quyền giáo viên nhập/sửa hạnh kiểm và xếp loại
async function checkIfClassTeacher(teacherId, classId) {
  const classData = await Class.findOne({ _id: classId, homeroomTeacher: teacherId });
  return classData ? true : false;
}
