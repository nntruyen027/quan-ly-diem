import { all, } from 'redux-saga/effects';
import authSaga from './auth/saga';
import subjectSaga from './subject/saga';
import accountSaga from './account/saga';
import classSage from './class/saga';
import assignmentSaga from './assignment/saga';
import gradeSaga from './grade/saga';
import ratingSaga from './rating/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    subjectSaga(),
    accountSaga(),
    classSage(),
    assignmentSaga(),
    gradeSaga(),
    ratingSaga(),
  ]);
}
