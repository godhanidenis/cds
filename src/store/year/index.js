import { createSlice } from '@reduxjs/toolkit';
import { getAllYear } from 'services/getYear';

const initialState = {
  allYearData: [],
  allYearLoading: false,
  allYearError: '',
  selectedYear: ''
};

const yearSlice = createSlice({
  name: 'year',
  initialState: initialState,
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all yearData
      .addCase(getAllYear?.pending, (state) => {
        state.allYearLoading = true;
        state.allYearError = '';
      })
      .addCase(getAllYear?.fulfilled, (state, action) => {
        state.allYearLoading = false;
        state.allYearData = action?.payload?.map((item) => ({
          key: item?.id,
          label: String(item?.year), // ensures label is a string
          value: item?.id
        }));
      })
      .addCase(getAllYear?.rejected, (state, action) => {
        state.allYearLoading = false;
        state.allYearError = action?.error?.message || 'Failed to fetch year data';
      });
  }
});

export const { setSelectedYear } = yearSlice.actions;
export default yearSlice.reducer;
