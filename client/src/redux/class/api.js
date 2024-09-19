import { apiFetch, } from '~/helpers';

export const getAllApi = (query) => apiFetch({
  url: 'classes',
  queryParams: query,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const getOneApi = (id) => apiFetch({
  url: `classes/${id}`,
  options: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneApi = (data) => apiFetch({
  url: 'classes',
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
  url: `classes/${id}`,
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
  url: `classes/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  },
});

export const getHomeroomApi = () => apiFetch({
  url: 'accounts/teachers/homeroom',
  options: {
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});