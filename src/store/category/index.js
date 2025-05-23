import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategoryData: [],
  selectedCategoryLoading: false,
  selectedCategoryError: '',
  CategoryAllOptions: [
    { label: 'University Basic', value: 'university-basic' },
    { label: 'UG Full Time Students', value: 'ug-full-time-students' },
    { label: 'UG Part Time Students', value: 'ug-part-time-students' },
    { label: 'UG All Student', value: 'ug-all-student' },
    { label: 'Grad Full Time Students', value: 'grad-full-time-students' },
    { label: 'Grad Part Time Students', value: 'grad-part-time-students' },
    { label: 'Grad All Student', value: 'grad-all-student' },
    { label: 'Total Students By Gender', value: 'total-students-by-gender' },
    { label: 'Ethnicity', value: 'ethnicity' },
    { label: 'Degrees Awarded', value: 'degrees-awarded' },
    { label: 'FTFY Applicants', value: 'ftfy-applicants' },
    { label: 'FTFY Admits', value: 'ftfy-admits' },
    { label: 'FTFY Enrolled By Status', value: 'ftfy-enrolled-by-status' },
    { label: 'Waitlist Info', value: 'waitlist-info' },
    { label: 'Academic Factors Importance', value: 'academic-factors-importance' },
    { label: 'Non-Academic Factors Importance', value: 'non-academic-factors-importance' },
    { label: 'Exam Based Admission Policy', value: 'exam-based-admission-policy' },
    { label: 'Percentile Scores 25/50/75', value: 'percentile-scores-25-50-75' },
    { label: 'SAT Subject Score Percent Distribution', value: 'sat-subject-score-percent-distribution' },
    { label: 'SAT Composite Score Percent Distribution', value: 'sat-composite-score-percent-distribution' },
    { label: 'ACT Score Percent Distribution', value: 'act-score-percent-distribution' },
    { label: 'FTFY Students School Rank Info', value: 'ftfy-students-school-rank-info' },
    { label: 'FTFY Student Distribution WRT GPA', value: 'ftfy-student-distribution-wrt-gpa' },
    { label: 'Transfer Admission Stats', value: 'transfer-admission-stats' },
    { label: 'Prerequisites For Transfer Students', value: 'prerequisites-for-transfer-students' },
    { label: 'Admit Profile', value: 'admit-profile' }
  ]
};

const qualityControlSlice = createSlice({
  name: 'category',
  initialState: initialState,

  extraReducers: (builder) => {
    builder;
  }
});

export default qualityControlSlice.reducer;
