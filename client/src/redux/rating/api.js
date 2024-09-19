import { apiFetch, } from '~/helpers';

// Nhập hoặc cập nhật hạnh kiểm
export const createOrUpdateConductApi = (classId, data) => apiFetch({
  url: `ratings/conduct/${classId}`,
  options: {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
});

// Xem xếp loại của học sinh
export const getRatingForStudentApi = ( term, academicYear) => apiFetch({
  url: 'ratings/student',
  queryParams: {
    term, academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem xếp loại của tất cả học sinh trong lớp
export const getRatingsForClassApi = (classId, term, academicYear) => apiFetch({
  url: `ratings/class/${classId}`,
  queryParams: {
    term, academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem xếp loại của học sinh theo năm học
export const getRatingForYearApi = (studentId, academicYear) => apiFetch({
  url: `ratings/student/${studentId}/academicYear`,
  queryParams: {
    academicYear,
  },
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Xem toàn bộ xếp loại của tất cả học sinh
export const getAllRatingsApi = () => apiFetch({
  url: 'ratings',
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});
