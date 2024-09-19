import { apiFetch, } from '~/helpers';

export const getAllApi = (query) => apiFetch({
  url: 'subjects',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneApi = (id) => apiFetch({
  url: `subjects/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneApi = (data) => apiFetch({
  url: 'subjects',
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
  url: `subjects/${id}`,
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
  url: `subjects/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  },
});