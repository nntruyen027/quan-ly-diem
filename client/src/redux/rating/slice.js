import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  ratings: [],
  rating: null,
  updateSuccess: false,
  meta: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    // Nhập hoặc cập nhật hạnh kiểm
    createOrUpdateConductStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    createOrUpdateConductSuccess: (state, action) => {
      state.loading = false;
      state.rating = action.payload;
      state.updateSuccess = true;
    },
    createOrUpdateConductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Xem xếp loại của học sinh
    getRatingForStudentStart: (state) => {
      state.loading = true;
      state.error = null;
      state.rating = null;
    },
    getRatingForStudentSuccess: (state, action) => {
      state.loading = false;
      state.rating = action.payload;
    },
    getRatingForStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Xem xếp loại của học sinh trong lớp
    getRatingsForClassStart: (state) => {
      state.loading = true;
      state.error = null;
      state.ratings = [];
    },
    getRatingsForClassSuccess: (state, action) => {
      state.loading = false;
      state.ratings = action.payload;
    },
    getRatingsForClassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Xem xếp loại của học sinh theo năm học
    getRatingForYearStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRatingForYearSuccess: (state, action) => {
      state.loading = false;
      state.rating = action.payload.data;
      state.meta = action.payload.meta;
    },
    getRatingForYearFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Xem toàn bộ xếp loại của tất cả học sinh
    getAllRatingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllRatingsSuccess: (state, action) => {
      state.loading = false;
      state.ratings = action.payload;
    },
    getAllRatingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrUpdateConductStart, createOrUpdateConductSuccess, createOrUpdateConductFailure,
  getRatingForStudentStart, getRatingForStudentSuccess, getRatingForStudentFailure,
  getRatingsForClassStart, getRatingsForClassSuccess, getRatingsForClassFailure,
  getRatingForYearStart, getRatingForYearSuccess, getRatingForYearFailure,
  getAllRatingsStart, getAllRatingsSuccess, getAllRatingsFailure,
} = ratingSlice.actions;

export default ratingSlice.reducer;
