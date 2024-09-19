import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  accounts: [],
  meta: null,
  account: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getStudentsByClassStart:
    (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentsByHomeroomStart:  (state) => {
      state.loading = true;
      state.error = null;
    },
    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload.data;
      state.meta = action.payload.meta;
    },
    getStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTeachersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTeachersSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload.data;
      state.meta = action.payload.meta;
    },
    getTeachersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAdminsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAdminsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAccountSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload;
    },
    getAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAccountStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.createSuccess = true;
    },
    createAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAccountStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateAccountSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.updateSuccess = true;
    },
    updateAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAccountStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteAccountSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createAccountFailure, createAccountStart, createAccountSuccess, deleteAccountFailure, deleteAccountStart, deleteAccountSuccess, getAccountFailure, getAccountStart, getAccountSuccess, getAdminsFailure, getAdminsStart, getAdminsSuccess, getStudentsFailure, getStudentsStart, getStudentsSuccess, getTeachersFailure, getTeachersStart, getTeachersSuccess, updateAccountFailure, updateAccountStart, updateAccountSuccess, getStudentsByClassStart, getStudentsByHomeroomStart, } = accountSlice.actions;

export default accountSlice.reducer;