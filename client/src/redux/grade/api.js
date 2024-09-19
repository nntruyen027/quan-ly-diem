import { apiFetch, } from '~/helpers';

// Nhập hoặc cập nhật điểm
export const createOrUpdateGradeApi = (data) => apiFetch({
  url: 'grades',
  options: {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
});

// Xem toàn bộ điểm của học sinh
export const getGradesForStudentApi = (studentId, term, academicYear) => apiFetch({
  url: `grades/student/${studentId}`,
  queryParams: {
    term, academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getMyGradesApi = (term, academicYear) => apiFetch({
  url: 'grades/student',
  queryParams: {
    term, academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem điểm của học sinh trong lớp theo môn học
export const getGradesForClassAndSubjectApi = (classId, subjectId, term, academicYear ) => apiFetch({
  url: `grades/class/${classId}/subject/${subjectId}`,
  queryParams: {
    term, academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem điểm của học sinh trong lớp theo học kỳ và năm học
export const getGradesForClassByTermAndYearApi = (classId, term, academicYear) => apiFetch({
  url: `grades/class/${classId}/term`,
  queryParams: {
    term, academicYear, 
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem toàn bộ điểm của tất cả học sinh
export const getAllGradesApi = () => apiFetch({
  url: 'grades',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem bảng điểm của học sinh theo học kỳ
export const getGradesByTermApi = (studentId, term) => apiFetch({
  url: `grades/${studentId}/term`,
  queryParams: {
    term, 
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem bảng điểm của học sinh theo năm học
export const getGradesByAcademicYearApi = (studentId, academicYear) => apiFetch({
  url: `grades/${studentId}/academicYear`,
  queryParams: {
    academicYear, 
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});
