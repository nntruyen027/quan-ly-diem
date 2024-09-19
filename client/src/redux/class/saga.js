import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOneApi, deleteOneApi, getAllApi, getHomeroomApi, getOneApi, updateOneApi, } from './api';
import { getClassesSuccess, getClassesFailure, getClassesStart, getClassSuccess, getClassFailure, getClassStart, createClassSuccess, createClassFailure, createClassStart, updateClassSuccess, updateClassFailure, updateClassStart, deleteClassSuccess, deleteClassFailure, deleteClassStart, getHomeroomStart, } from './slice';

function* getAllRequest(action) {
  try {
    const { data, meta, } = yield call(getAllApi, action.payload);
    yield put(getClassesSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getClassesFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getOneRequest(action) {
  try {
    const { data, } = yield call(getOneApi, action.payload);
    yield put(getClassSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getClassFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* createOneRequest(action) {
  try {
    const data = yield call(createOneApi, action.payload);
    yield put(createClassSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(createClassFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* updateOneRequest(action) {
  try {
    const data = yield call(updateOneApi, action.payload.id, action.payload.data);
    yield put(updateClassSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(updateClassFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOneApi, action.payload);
    yield put(deleteClassSuccess());
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(deleteClassFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getHomeroomRequest() {
  try {
    const { data, } = yield call(getHomeroomApi);
    yield put(getClassSuccess(data));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getClassFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchClassActions() {
  yield takeLatest(getClassesStart.type, getAllRequest);
  yield takeLatest(getClassStart.type, getOneRequest);
  yield takeLatest(createClassStart.type, createOneRequest);
  yield takeLatest(updateClassStart.type, updateOneRequest);
  yield takeLatest(deleteClassStart.type, deleteOneRequest);
  yield takeLatest(getHomeroomStart.type, getHomeroomRequest);
}