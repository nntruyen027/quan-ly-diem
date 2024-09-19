export const authRoutes = {
  login: '/login',
  logup: '/logup',
  resetPassword: '/reset-password',
  adminLogin: '/admin/login',
  teacherLogin: '/teacher/login',
  forgotPassword: '/forgot-password',
};

export const studentRoutes = {
  index: '/',
  home: '/home',
  aboutSchool: '/about-school',
  grade: '/grade',
  info: '/profile',
};

export const adminRoutes = {
  profile: '/admin/profile',
  category: {
    subject: '/admin/subject',
    class: '/admin/class',
  },
  student: '/admin/student',
  teacher: '/admin/teacher',
  admin: '/admin/admin',
  teacherAsignment: '/admin/teacher-assignment',
  grade: '/admin/grade',
  classDetail: '/admin/class/:id/students',
  classAssign: '/admin/class/:id/subjects',
};

export const teacherRoutes = {
  profile: '/teacher/profile',
  homeroom: '/teacher/homeroom/students',
  grades: '/teacher/homeroom/grades',
  editRating: '/teacher/homeroom/ratings/edit',
  viewRating: '/teacher/homeroom/ratings',
  assignment: '/teacher/assignment',
  subjectGrade: '/teacher/:classId/:subjectId',
  studentDetail: '/teacher/homeroom/:studentId',
  subjectGradeView: '/teacher/:classId/:subjectId/grades',
};