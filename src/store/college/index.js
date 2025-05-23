import { createSlice } from '@reduxjs/toolkit';
import { getCollege, createCollege, getSingleCollege } from 'services/getCollege';

const initialState = {
  collegeData: [],
  collegeSingleData: [],
  collegeTotalRecords: 0,
  collegeLoading: false,
  collegeSingleLoading: true,
  createCollegeLoading: false,
  collegeError: '',
  collegeSingleError: ''
};

const collegeSlice = createSlice({
  name: 'college',
  initialState: initialState,
  reducers: {
    setSelectedUniversity: (state, action) => {
      state.selectedUniversity = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch collegeData
      .addCase(getCollege?.pending, (state) => {
        state.collegeLoading = true;
        state.collegeError = '';
      })
      .addCase(getCollege?.fulfilled, (state, action) => {
        state.collegeLoading = false;
        state.collegeTotalRecords = action?.payload?.count;
        state.collegeData = action?.payload?.results;
      })
      .addCase(getCollege?.rejected, (state, action) => {
        const isAbort = action?.payload?.name === 'AbortError' || /abort/i.test(action?.payload?.message);
        if (isAbort) {
          return;
        }
        state.collegeLoading = false;
        state.collegeError = action?.error?.message || 'Failed to fetch college data';
      })
      // Fetch single collegeData
      .addCase(getSingleCollege?.pending, (state) => {
        state.collegeSingleLoading = true;
        state.collegeError = '';
      })
      .addCase(getSingleCollege?.fulfilled, (state, action) => {
        state.collegeSingleLoading = false;
        state.collegeSingleData = action?.payload;
      })
      .addCase(getSingleCollege?.rejected, (state, action) => {
        state.collegeSingleLoading = false;
        state.collegeSingleError = action?.error?.message || 'Failed to fetch single college data';
      })

      // Create collegeData
      .addCase(createCollege?.pending, (state) => {
        state.createCollegeLoading = true;
        state.collegeError = '';
      })
      .addCase(createCollege?.fulfilled, (state, action) => {
        state.createCollegeLoading = false;
        state.collegeData.unshift(action?.payload);
      })
      .addCase(createCollege?.rejected, (state, action) => {
        state.createCollegeLoading = false;
        state.collegeError = action?.payload?.message || 'Failed to create college';
      });
  }
});

export const { setSelectedUniversity } = collegeSlice.actions;
export default collegeSlice.reducer;
