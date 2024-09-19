// Add selectors to get grades, loading and error states
export const selectGrades = (state) => state.grade.grades;
export const selectLoading = (state) => state.grade.loading;
export const selectError = (state) => state.grade.error;
