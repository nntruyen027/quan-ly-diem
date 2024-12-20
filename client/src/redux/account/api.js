import { apiFetch, } from '~/helpers';

// Các API hiện có
export const getAllAdminApi = (query) => apiFetch({
  url: 'accounts/admin',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getAllStudentApi = (query) => apiFetch({
  url: 'accounts/students',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getAllStudentByClassApi = (id, query) => apiFetch({
  url: `classes/${id}/students`,
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getAllTeacherApi = (query) => apiFetch({
  url: 'accounts/teachers',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneApi = (id) => apiFetch({
  url: `accounts/admin/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneApi = (data) => apiFetch({
  url: 'accounts/admin',
  options: {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'POST',
    body: data,
  },
});

export const updateOneApi = (id, data) => apiFetch({
  url: `accounts/admin/${id}`,
  options: {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'PUT',
    body: data,
  },
});

export const deleteOneApi = (id) => apiFetch({
  url: `accounts/admin/${id}`,
  options: {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'DELETE',
  },
});

export const getStudentsByHomeroomApi = () => apiFetch({
  url: 'accounts/teachers/homeroom',
  options: {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Thêm API upload file
export const uploadFileAPI = (formData) => apiFetch({
  url: 'accounts/students/upload', // Đường dẫn API để upload file
  options: {
    method: 'POST',
    body: formData,
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

// Thêm API download template
export const downloadTemplateAPI = () => apiFetch({
  url: 'accounts/students/template', // Đường dẫn API để tải template
  options: {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});
