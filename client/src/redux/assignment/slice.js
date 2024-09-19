import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  assignments: [],
  meta: null,
  assignment: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    getAssignmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAssignmentsByClassStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAssignmentsByTeacherState: (state) => {  
      state.loading = true;
      state.error = null;
    },
    getAssignmentsSuccess: (state, action) => {
      state.loading = false;
      state.assignments = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAssignmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAssignmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAssignmentSuccess: (state, action) => {
      state.loading = false;
      state.assignment = action.payload;
    },
    getAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAssignmentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createAssignmentSuccess: (state, action) => {
      state.loading = false;
      state.assignment = action.payload;
      state.createSuccess = true;
    },
    createAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAssignmentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateAssignmentSuccess: (state, action) => {
      state.loading = false;
      state.assignment = action.payload;
      state.updateSuccess = true;
    },
    updateAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAssignmentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteAssignmentSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createAssignmentFailure, createAssignmentStart, createAssignmentSuccess, deleteAssignmentFailure, deleteAssignmentStart, deleteAssignmentSuccess, getAssignmentFailure, getAssignmentStart, getAssignmentSuccess, getAssignmentsFailure, getAssignmentsSuccess, getAssignmentsStart, updateAssignmentFailure, updateAssignmentStart, updateAssignmentSuccess, getAssignmentsByTeacherState, getAssignmentsByClassStart, } = assignmentSlice.actions;

export default assignmentSlice.reducer;