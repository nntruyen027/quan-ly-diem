import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createOrUpdateConductApi, getRatingForStudentApi, getRatingsForClassApi,
  getRatingForYearApi, getAllRatingsApi, } from './api';
import { createOrUpdateConductStart, createOrUpdateConductSuccess, createOrUpdateConductFailure,
  getRatingForStudentStart, getRatingForStudentSuccess, getRatingForStudentFailure,
  getRatingsForClassStart, getRatingsForClassSuccess, getRatingsForClassFailure,
  getRatingForYearStart, getRatingForYearSuccess, getRatingForYearFailure,
  getAllRatingsStart, getAllRatingsSuccess, getAllRatingsFailure, } from './slice';

// Create or Update Conduct
function* createOrUpdateConductRequest(action) {
  try {
    const { data, } = yield call(createOrUpdateConductApi, action.payload.classId, action.payload.data);
    yield put(createOrUpdateConductSuccess(data));
    yield put(showSnackbar({
      message: 'Conduct saved successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(createOrUpdateConductFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to save conduct: ${err.message}`, severity: 'error',
    }));
  }
}

// Get Rating for Student
function* getRatingForStudentRequest(action) {
  try {
    const { data, } = yield call(getRatingForStudentApi, action.payload.term, action.payload.academicYear);
    yield put(getRatingForStudentSuccess(data));
    yield put(showSnackbar({
      message: 'Rating fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getRatingForStudentFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch rating: ${err.message}`, severity: 'error',
    }));
  }
}

// Get Ratings for Class
function* getRatingsForClassRequest(action) {
  try {
    const { data, } = yield call(getRatingsForClassApi, action.payload.classId, action.payload.term, action.payload.academicYear);
    yield put(getRatingsForClassSuccess(data));
    yield put(showSnackbar({
      message: 'Ratings fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getRatingsForClassFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch ratings: ${err.message}`, severity: 'error',
    }));
  }
}

// Get Rating for Year
function* getRatingForYearRequest(action) {
  try {
    const { data, } = yield call(getRatingForYearApi, action.payload.studentId, action.payload.academicYear);
    yield put(getRatingForYearSuccess(data));
    yield put(showSnackbar({
      message: 'Rating for year fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getRatingForYearFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch rating for year: ${err.message}`, severity: 'error',
    }));
  }
}

// Get All Ratings
function* getAllRatingsRequest() {
  try {
    const { data, } = yield call(getAllRatingsApi);
    yield put(getAllRatingsSuccess(data));
    yield put(showSnackbar({
      message: 'All ratings fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getAllRatingsFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch all ratings: ${err.message}`, severity: 'error',
    }));
  }
}

// Watcher Saga
export default function* watchRatingActions() {
  yield takeLatest(createOrUpdateConductStart.type, createOrUpdateConductRequest);
  yield takeLatest(getRatingForStudentStart.type, getRatingForStudentRequest);
  yield takeLatest(getRatingsForClassStart.type, getRatingsForClassRequest);
  yield takeLatest(getRatingForYearStart.type, getRatingForYearRequest);
  yield takeLatest(getAllRatingsStart.type, getAllRatingsRequest);
}
