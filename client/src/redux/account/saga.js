import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOneApi, deleteOneApi, getAllAdminApi, getAllStudentApi, getAllTeacherApi, getOneApi, updateOneApi,getAllStudentByClassApi, getStudentsByHomeroomApi, } from './api';
import { createAccountFailure, createAccountStart, createAccountSuccess, deleteAccountFailure, deleteAccountStart, deleteAccountSuccess, getAccountFailure, getAccountStart, getAccountSuccess, getAdminsFailure, getAdminsStart, getAdminsSuccess, getStudentsFailure, getStudentsStart, getStudentsSuccess, getTeachersFailure, getTeachersStart, getTeachersSuccess, updateAccountFailure, updateAccountStart, updateAccountSuccess, getStudentsByClassStart, getStudentsByHomeroomStart, } from './slice';
import { getClassSuccess, } from '../class/slice';

function* getStudentsRequest(action) {
  try {
    const { data, meta, } = yield call(getAllStudentApi, action.payload);
    yield put(getStudentsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getStudentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getStudentsByHoomroomRequest() {
  try {
    const { data, } = yield call(getStudentsByHomeroomApi);
    yield put(getClassSuccess(data));
    yield put(getStudentsSuccess({
      data: data?.students, meta: null,
    }));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getStudentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getStudentsByClassRequest(action) {
  try {
    const { data, meta, } = yield call(getAllStudentByClassApi, action.payload.id, action.payload.query);
    yield put(getStudentsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getStudentsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getTeachersRequest(action) {
  try {
    const { data, meta, } = yield call(getAllTeacherApi, action.payload);
    yield put(getTeachersSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getTeachersFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getAdminsRequest(action) {
  try {
    const { data, meta, } = yield call(getAllAdminApi, action.payload);
    yield put(getAdminsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAdminsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getAccountRequest(action) {
  try {
    const { data, } = yield call(getOneApi, action.payload);
    yield put(getAccountSuccess(data));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(getAccountFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* createAccountRequest(action) {
  try {
    const { data, } = yield call(createOneApi, action.payload);
    yield put(createAccountSuccess(data));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(createAccountFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* updateAccountRequest(action) {
  try {
    const { data, } = yield call(updateOneApi, action.payload.id, action.payload.data);
    yield put(updateAccountSuccess(data));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(updateAccountFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* deleteAccountRequest(action) {
  try {
    const { data, } = yield call(deleteOneApi, action.payload);
    yield put(deleteAccountSuccess(data));
    yield put(showSnackbar({
      message: 'Request success', severity: 'success', 
    }));
  }
  catch(err) {
    yield put(deleteAccountFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchAccountActions() {
  yield takeLatest(getStudentsStart.type, getStudentsRequest);
  yield takeLatest(getStudentsByClassStart.type, getStudentsByClassRequest);
  yield takeLatest(getTeachersStart.type, getTeachersRequest);
  yield takeLatest(getAdminsStart.type, getAdminsRequest);
  yield takeLatest(getAccountStart.type, getAccountRequest);
  yield takeLatest(createAccountStart.type, createAccountRequest);
  yield takeLatest(updateAccountStart.type, updateAccountRequest);
  yield takeLatest(deleteAccountStart.type, deleteAccountRequest);
  yield takeLatest(getStudentsByHomeroomStart.type, getStudentsByHoomroomRequest);
}