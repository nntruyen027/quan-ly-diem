// store.js
import { configureStore, } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools, } from 'redux-devtools-extension';
import authReducer from './auth/slice';
import snackbarReducer from './snackbar/slice';
import subjectReducer from './subject/slice';
import accountReducer from './account/slice';
import classReducer from './class/slice';
import assignmentReducer from './assignment/slice';
import gradeReducer from './grade/slice';
import ratingReducer from './rating/slice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    subject: subjectReducer,
    account: accountReducer,
    class: classReducer,
    assignment: assignmentReducer,
    grade: gradeReducer,
    rating: ratingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : undefined,
});

sagaMiddleware.run(rootSaga);

export default store;
