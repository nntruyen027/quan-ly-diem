import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOneApi, deleteOneApi, getAllApi, getOneApi, updateOneApi, getAllOfTeacherApi, getTeachingAssignmentsByClassApi, } from './api';
import { getAssignmentsSuccess, getAssignmentsFailure, getAssignmentsStart, getAssignmentSuccess, getAssignmentFailure, getAssignmentStart, createAssignmentSuccess, createAssignmentFailure, createAssignmentStart, updateAssignmentSuccess, updateAssignmentFailure, updateAssignmentStart, deleteAssignmentSuccess, deleteAssignmentFailure, deleteAssignmentStart, getAssignmentsByTeacherState, getAssignmentsByClassStart, } from './slice';

function* getAllRequest(action) {
  try {
    const { data, meta, } = yield call(getAllApi, action.payload);
    yield put(getAssignmentsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAssignmentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getAllByClassRequest(action) {
  try {
    const { data, meta, } = yield call(getTeachingAssignmentsByClassApi, action.payload.id, action.payload.query);
    yield put(getAssignmentsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAssignmentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getAllByTeacherRequest(action) {
  try {
    const { data, meta, } = yield call(getAllOfTeacherApi, action.payload);
    yield put(getAssignmentsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAssignmentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getOneRequest(action) {
  try {
    const data = yield call(getOneApi, action.payload);
    yield put(getAssignmentSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAssignmentFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* createOneRequest(action) {
  try {
    const data = yield call(createOneApi, action.payload);
    yield put(createAssignmentSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(createAssignmentFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* updateOneRequest(action) {
  try {
    const data = yield call(updateOneApi, action.payload.id, action.payload.data);
    yield put(updateAssignmentSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(updateAssignmentFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOneApi, action.payload);
    yield put(deleteAssignmentSuccess());
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(deleteAssignmentFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchAssignmentActions() {
  yield takeLatest(getAssignmentsStart.type, getAllRequest);
  yield takeLatest(getAssignmentsByClassStart.type, getAllByClassRequest);
  yield takeLatest(getAssignmentsByTeacherState.type, getAllByTeacherRequest);
  yield takeLatest(getAssignmentStart.type, getOneRequest);
  yield takeLatest(createAssignmentStart.type, createOneRequest);
  yield takeLatest(updateAssignmentStart.type, updateOneRequest);
  yield takeLatest(deleteAssignmentStart.type, deleteOneRequest);
}