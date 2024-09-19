import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOneApi, deleteOneApi, getAllApi, getOneApi, updateOneApi, } from './api';
import { getSubjectsSuccess, getSubjectsFailure, getSubjectsStart, getSubjectSuccess, getSubjectFailure, getSubjectStart, createSubjectSuccess, createSubjectFailure, createSubjectStart, updateSubjectSuccess, updateSubjectFailure, updateSubjectStart, deleteSubjectSuccess, deleteSubjectFailure, deleteSubjectStart, } from './slice';

function* getAllRequest(action) {
  try {
    const { data, meta, } = yield call(getAllApi, action.payload);
    yield put(getSubjectsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getSubjectsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getOneRequest(action) {
  try {
    const { data, } = yield call(getOneApi, action.payload);
    yield put(getSubjectSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getSubjectFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* createOneRequest(action) {
  try {
    const data = yield call(createOneApi, action.payload);
    yield put(createSubjectSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(createSubjectFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* updateOneRequest(action) {
  try {
    const data = yield call(updateOneApi, action.payload.id, action.payload.data);
    yield put(updateSubjectSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(updateSubjectFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOneApi, action.payload);
    yield put(deleteSubjectSuccess());
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(deleteSubjectFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchSubjectActions() {
  yield takeLatest(getSubjectsStart.type, getAllRequest);
  yield takeLatest(getSubjectStart.type, getOneRequest);
  yield takeLatest(createSubjectStart.type, createOneRequest);
  yield takeLatest(updateSubjectStart.type, updateOneRequest);
  yield takeLatest(deleteSubjectStart.type, deleteOneRequest);
}