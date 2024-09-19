// Add selectors to get grades, loading and error states
export const selectGrades = (state) => state.rating.ratings;
export const selectLoading = (state) => state.rating.loading;
export const selectError = (state) => state.rating.error;
