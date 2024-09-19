import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  grades: [],
  grade: null,
  updateSuccess: false,
};

const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    createOrUpdateGradeStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    createOrUpdateGradeSuccess: (state, action) => {
      state.loading = false;
      state.grade = action.payload;
      state.updateSuccess = true;
    },
    createOrUpdateGradeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGradesForStudentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMyGradesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradesForStudentSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getGradesForStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGradesForClassAndSubjectStart: (state) => {
      state.loading = true;
      state.error = null;
      state.grades = [];
    },
    getGradesForClassAndSubjectSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getGradesForClassAndSubjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGradesForClassByTermAndYearStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradesForClassByTermAndYearSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getGradesForClassByTermAndYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllGradesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllGradesSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getAllGradesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGradesByTermStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradesByTermSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getGradesByTermFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGradesByAcademicYearStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGradesByAcademicYearSuccess: (state, action) => {
      state.loading = false;
      state.grades = action.payload;
    },
    getGradesByAcademicYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAssignmentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAssignmentSuccess: (state, action) => {
      state.loading = false;
      const updatedGrade = action.payload;
      state.grades = state.grades.map((grade) =>
        grade._id === updatedGrade._id ? updatedGrade : grade
      );
    },
    updateAssignmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrUpdateGradeStart, createOrUpdateGradeSuccess, createOrUpdateGradeFailure,
  getGradesForStudentStart, getGradesForStudentSuccess, getGradesForStudentFailure,
  getGradesForClassAndSubjectStart, getGradesForClassAndSubjectSuccess, getGradesForClassAndSubjectFailure,
  getGradesForClassByTermAndYearStart, getGradesForClassByTermAndYearSuccess, getGradesForClassByTermAndYearFailure,
  getAllGradesStart, getAllGradesSuccess, getAllGradesFailure,
  getGradesByTermStart, getGradesByTermSuccess, getGradesByTermFailure,
  getGradesByAcademicYearStart, getGradesByAcademicYearSuccess, getGradesByAcademicYearFailure, updateAssignmentFailure, updateAssignmentStart, updateAssignmentSuccess, getMyGradesStart,
} = gradeSlice.actions;

export default gradeSlice.reducer;
