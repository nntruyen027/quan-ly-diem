import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  classes: [],
  meta: null,
  classroom: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    getClassesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClassesSuccess: (state, action) => {
      state.loading = false;
      state.classes = action.payload.data;
      state.meta = action.payload.meta;
    },
    getClassesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getClassStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getHomeroomStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getClassSuccess: (state, action) => {
      state.loading = false;
      state.classroom = action.payload;
    },
    getClassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createClassStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createClassSuccess: (state, action) => {
      state.loading = false;
      state.classroom = action.payload;
      state.createSuccess = true;
    },
    createClassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateClassStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateClassSuccess: (state, action) => {
      state.loading = false;
      state.classroom = action.payload;
      state.updateSuccess = true;
    },
    updateClassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClassStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteClassSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteClassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createClassFailure, createClassStart, createClassSuccess, deleteClassFailure, deleteClassStart, deleteClassSuccess,getClassFailure, getClassStart, getClassSuccess, getClassesFailure, getClassesSuccess, getClassesStart, updateClassFailure, updateClassStart, updateClassSuccess, getHomeroomStart, } = classSlice.actions;

export default classSlice.reducer;