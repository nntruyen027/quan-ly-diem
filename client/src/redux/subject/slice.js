import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  subjects: [],
  meta: null,
  subject: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    getSubjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubjectsSuccess: (state, action) => {
      state.loading = false;
      state.subjects = action.payload.data;
      state.meta = action.payload.meta;
    },
    getSubjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSubjectStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSubjectSuccess: (state, action) => {
      state.loading = false;
      state.subject = action.payload;
    },
    getSubjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSubjectStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createSubjectSuccess: (state, action) => {
      state.loading = false;
      state.subject = action.payload;
      state.createSuccess = true;
    },
    createSubjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSubjectStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateSubjectSuccess: (state, action) => {
      state.loading = false;
      state.subject = action.payload;
      state.updateSuccess = true;
    },
    updateSubjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSubjectStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteSubjectSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteSubjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createSubjectFailure, createSubjectStart, createSubjectSuccess, deleteSubjectFailure, deleteSubjectStart, deleteSubjectSuccess, getSubjectFailure, getSubjectStart, getSubjectSuccess, getSubjectsFailure, getSubjectsStart, getSubjectsSuccess, updateSubjectFailure, updateSubjectStart, updateSubjectSuccess, } = subjectSlice.actions;

export default subjectSlice.reducer;