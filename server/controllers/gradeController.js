const Grade = require('../models/Grade');
const User = require('../models/User');
const Class = require('../models/Class');
const TeachingAssignment = require('../models/TeachingAssignment');

// Nhập hoặc cập nhật điểm cho một học sinh theo môn học và lớp học
exports.createOrUpdateGrade = async (req, res) => {
  const { studentId, subjectId, classId, term, academicYear, grades } = req.body;
  const teacherId = req.user.id;

  try {
    console.log(teacherId, subjectId, classId)
    const teacherCanEdit = await canTeacherEditSubject(teacherId, subjectId, classId);
    if (!teacherCanEdit) {
      return res.status(403).json({ error: 'Bạn không có quyền sửa điểm môn học này.' });
    }

    let grade = await Grade.findOne({ student: studentId, subject: subjectId, class: classId, term, academicYear });
    console.log(grade)

    if (grade) {
      grade.grades = grades;
      grade.calculateAverageScore();
      await grade.save();
      res.status(200).json({ data: grade.grades });
    } else {
      grade = new Grade({
        student: studentId,
        subject: subjectId,
        class: classId,
        term,
        academicYear,
        grades,
      });
      grade.calculateAverageScore();
      await grade.save();
      res.status(201).json({ data: grade.grades });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Xem điểm của một học sinh theo lớp và môn học
exports.getGradesForClassAndSubject = async (req, res) => {
  const { classId, subjectId,} = req.params;
  const { term, academicYear } = req.query;
  const teacherId = req.user.id; 
  console.log(teacherId, subjectId, classId)

  try {
    // const teacherCanView = await canTeacherEditSubject(teacherId, subjectId, classId);
    // if (!teacherCanView) {
    //   return res.status(403).json({ error: 'Bạn không có quyền xem điểm môn học này.' });
    // }

    const students = await User.find({ class: classId });
    const studentGrades = await Promise.all(
      students.map(async (student) => {
        const grades = await Grade.findOne({ student: student._id, class: classId, subject: subjectId, term, academicYear });
        return {
          student: {
            _id: student._id,
            name: student.fullname,
          },
          grades: grades?.grades || [],
          averageScore: grades?.averageScore
        };
      })
    );

    res.status(200).json({ data: studentGrades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Xem điểm của lớp theo học kỳ và năm học (giáo viên chủ nhiệm)
exports.getGradesForClassByTermAndYear = async (req, res) => {
  const { classId } = req.params;
  const { term, academicYear } = req.query;
  const teacherId = req.user._id; // Lấy ID của giáo viên chủ nhiệm từ thông tin xác thực

  try {
    const isClassTeacher = await checkIfClassTeacher(teacherId, classId);
    if (!isClassTeacher) {
      return res.status(403).json({ error: 'Bạn không có quyền xem điểm của lớp này.' });
    }

    const students = await User.find({ class: classId });
    const studentGrades = await Promise.all(
      students.map(async (student) => {
        const grades = await Grade.find({
          student: student._id,
          class: classId,
          term: term,
          academicYear: academicYear,
        }).populate('subject').populate('student');
        
        return {
          grades: grades || [],
        };
      })
    );

    res.status(200).json({ data: studentGrades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Kiểm tra quyền giáo viên nhập/sửa điểm môn học
async function canTeacherEditSubject(teacherId, subjectId, classId) {
  const admin = await User.findById(teacherId)
  if(admin.isAdmin)
    return true
  // Tìm trong bảng TeachingAssignment
  const teachingAssignment = await TeachingAssignment.findOne({
    teacher: teacherId,
    subject: subjectId,
    class: classId,
  });
  return teachingAssignment ? true : false;
}

// Kiểm tra giáo viên có phải là giáo viên chủ nhiệm của lớp không
async function checkIfClassTeacher(teacherId, classId) {
  const classData = await Class.findOne({ _id: classId, homeroomTeacher: teacherId });
  return classData ? true : false;
}

// Xem toàn bộ điểm của một học sinh (giáo viên chủ nhiệm, giáo viên bộ môn, admin)
exports.getGradesForStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const { term, academicYear } = req.query;

  try {
    const grades = await Grade.find({ student: studentId, term, academicYear }).populate('subject').populate('class');
    res.status(200).json({ data: grades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getMyGrades = async (req, res) => {
  const studentId = req.user.id;
  const { term, academicYear } = req.query;

  try {
    const grades = await Grade.find({ student: studentId, term, academicYear }).populate('subject').populate('class');
    res.status(200).json({ data: grades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Xem bảng điểm của học sinh theo học kỳ
exports.getGradesByTerm = async (req, res) => {
  const studentId = req.params.studentId;
  const term = req.query.term;
  const academicYear = req.query.academicYear;

  try {
    const grades = await Grade.find({
      student: studentId,
      term: term,
      academicYear: academicYear,
    }).populate('subject').populate('class');

    res.status(200).json({ data: grades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Xem bảng điểm của học sinh theo năm học
exports.getGradesByAcademicYear = async (req, res) => {
  const studentId = req.params.studentId;
  const academicYear = req.query.academicYear;

  try {
    const grades = await Grade.find({
      student: studentId,
      academicYear: academicYear,
    }).populate('subject').populate('class');

    res.status(200).json({ data: grades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// Xem điểm của tất cả học sinh trong một năm học (admin)
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('student').populate('subject').populate('class');
    res.status(200).json({ data: grades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};
