import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOrUpdateGradeApi, getGradesForStudentApi, getGradesForClassAndSubjectApi,
  getGradesForClassByTermAndYearApi, getAllGradesApi, getGradesByTermApi, getGradesByAcademicYearApi,
  getMyGradesApi, } from './api';
import { createOrUpdateGradeStart, createOrUpdateGradeSuccess, createOrUpdateGradeFailure,
  getGradesForStudentStart, getGradesForStudentSuccess, getGradesForStudentFailure,
  getGradesForClassAndSubjectStart, getGradesForClassAndSubjectSuccess, getGradesForClassAndSubjectFailure,
  getGradesForClassByTermAndYearStart, getGradesForClassByTermAndYearSuccess, getGradesForClassByTermAndYearFailure,
  getAllGradesStart, getAllGradesSuccess, getAllGradesFailure,
  getGradesByTermStart, getGradesByTermSuccess, getGradesByTermFailure,
  getGradesByAcademicYearStart, getGradesByAcademicYearSuccess, getGradesByAcademicYearFailure,
  getMyGradesStart, } from './slice';

function* createOrUpdateGradeRequest(action) {
  try {
    const data = yield call(createOrUpdateGradeApi, action.payload);
    yield put(createOrUpdateGradeSuccess(data));
    yield put(showSnackbar({
      message: 'Grade saved successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(createOrUpdateGradeFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to save grade: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getGradesForStudentRequest(action) {
  try {
    const { data, } = yield call(getGradesForStudentApi, action.payload.studentId, action.payload.term, action.payload.academicYear);
    yield put(getGradesForStudentSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesForStudentFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getMyGradesRequest(action) {
  try {
    const { data, } = yield call(getMyGradesApi, action.payload.term, action.payload.academicYear);
    yield put(getGradesForStudentSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesForStudentFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getGradesForClassAndSubjectRequest(action) {
  try {
    const { data, } = yield call(getGradesForClassAndSubjectApi, action.payload.classId, action.payload.subjectId, action.payload.term, action.payload.academicYear);
    yield put(getGradesForClassAndSubjectSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesForClassAndSubjectFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getGradesForClassByTermAndYearRequest(action) {
  try {
    const { data, } = yield call(getGradesForClassByTermAndYearApi, action.payload.classId, action.payload.term, action.payload.academicYear);
    yield put(getGradesForClassByTermAndYearSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesForClassByTermAndYearFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getAllGradesRequest() {
  try {
    const { data, } = yield call(getAllGradesApi);
    yield put(getAllGradesSuccess(data));
    yield put(showSnackbar({
      message: 'All grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getAllGradesFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getGradesByTermRequest(action) {
  try {
    const { data, } = yield call(getGradesByTermApi, action.payload.studentId, action.payload.term);
    yield put(getGradesByTermSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesByTermFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

function* getGradesByAcademicYearRequest(action) {
  try {
    const { data, } = yield call(getGradesByAcademicYearApi, action.payload.studentId, action.payload.academicYear);
    yield put(getGradesByAcademicYearSuccess(data));
    yield put(showSnackbar({
      message: 'Grades fetched successfully!', severity: 'success', 
    }));
  } catch (err) {
    yield put(getGradesByAcademicYearFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch grades: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchGradeActions() {
  yield takeLatest(createOrUpdateGradeStart.type, createOrUpdateGradeRequest);
  yield takeLatest(getGradesForStudentStart.type, getGradesForStudentRequest);
  yield takeLatest(getMyGradesStart.type, getMyGradesRequest);
  yield takeLatest(getGradesForClassAndSubjectStart.type, getGradesForClassAndSubjectRequest);
  yield takeLatest(getGradesForClassByTermAndYearStart.type, getGradesForClassByTermAndYearRequest);
  yield takeLatest(getAllGradesStart.type, getAllGradesRequest);
  yield takeLatest(getGradesByTermStart.type, getGradesByTermRequest);
  yield takeLatest(getGradesByAcademicYearStart.type, getGradesByAcademicYearRequest);
}
