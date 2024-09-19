import { apiFetch, } from '~/helpers';

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

export const createOneApi = data => apiFetch({
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

export const updateOneApi = (id,data) => apiFetch({
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