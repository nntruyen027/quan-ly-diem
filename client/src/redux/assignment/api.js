import { apiFetch, } from '~/helpers';

export const getAllApi = (query) => apiFetch({
  url: 'teaching-assignments',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneApi = (id) => apiFetch({
  url: `teaching-assignments/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneApi = (data) => apiFetch({
  url: 'teaching-assignments',
  options: {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: data,
  },
});

export const updateOneApi = (id, data) => apiFetch({
  url: `teaching-assignments/${id}`,
  options: {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: data,
  },
});

export const deleteOneApi = (id) => apiFetch({
  url: `teaching-assignments/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  },
});

export const getAllOfTeacherApi = (query) => apiFetch({
  url: 'accounts/teachers/assignments',
  options: {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
  queryParams: query,
});

export const getTeachingAssignmentsByClassApi = (id, query) => apiFetch({
  url: `teaching-assignments/class/${id}`,
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});