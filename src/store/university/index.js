import { createSlice } from '@reduxjs/toolkit';
import { getAllUniversity } from 'services/getUniversity';

const initialState = {
  allUniversityData: [],
  allUniversityLoading: false,
  allUniversityError: '',
  selectedUniversity: ''
};

const universitySlice = createSlice({
  name: 'university',
  initialState: initialState,
  reducers: {
    setSelectedUniversity: (state, action) => {
      state.selectedUniversity = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch full collegeData
      .addCase(getAllUniversity?.pending, (state) => {
        state.allUniversityLoading = true;
        state.allUniversityError = '';
      })
      .addCase(getAllUniversity?.fulfilled, (state, action) => {
        state.allUniversityLoading = false;
        state.allUniversityData = action?.payload
          ?.slice()
          ?.reverse()
          ?.map((item) => ({ key: item?.id, label: item?.name, value: item?.id }));
      })
      .addCase(getAllUniversity?.rejected, (state, action) => {
        state.allUniversityLoading = false;
        state.allUniversityError = action?.error?.message || 'Failed to fetch university data';
      });
  }
});

export const { setSelectedUniversity } = universitySlice.actions;
export default universitySlice.reducer;
