import { createSlice } from '@reduxjs/toolkit';
import { assignQualityControl, getAllQualityControl, getSelectedQualityControl } from 'services/getQualityControl';

const initialState = {
  qualityControlData: [],
  qualityControlLoading: true,
  qualityControlError: '',
  assignQualityControlLoading: false,
  assignQualityControlError: '',
  QCStatusOptions: [
    { label: 'Assigned', value: 'assigned' },
    { label: 'Completed', value: 'done' },
    { label: 'Pending', value: 'pending' },
    { label: 'Not Assigned', value: 'not_assigned' }
  ],
  selectedQCStatus: '',
  selectedQualityControlData: [],
  selectedQualityControlLoading: true,
  selectedQualityControlError: ''
};

const qualityControlSlice = createSlice({
  name: 'qualityControl',
  initialState: initialState,
  reducers: {
    setSelectedQCStatus: (state, action) => {
      state.selectedQCStatus = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // Fetch all qualityControlData
      .addCase(getAllQualityControl?.pending, (state) => {
        state.qualityControlLoading = true;
        state.collegeError = '';
      })
      .addCase(getAllQualityControl?.fulfilled, (state, action) => {
        state.qualityControlLoading = false;
        state.qualityControlData = action?.payload;
      })
      .addCase(getAllQualityControl?.rejected, (state, action) => {
        state.qualityControlLoading = false;
        state.qualityControlError = action?.error?.message || 'Failed to fetch quality control data';
      })

      // Fetch selected qualityControlData
      .addCase(getSelectedQualityControl?.pending, (state) => {
        state.selectedQualityControlLoading = true;
        state.collegeError = '';
      })
      .addCase(getSelectedQualityControl?.fulfilled, (state, action) => {
        state.selectedQualityControlLoading = false;
        state.selectedQualityControlData = action?.payload;
      })
      .addCase(getSelectedQualityControl?.rejected, (state, action) => {
        state.selectedQualityControlLoading = false;
        state.selectedQualityControlError = action?.error?.message || 'Failed to fetch selected quality control data';
      })

      // Assign qualityControl
      .addCase(assignQualityControl?.pending, (state) => {
        state.assignQualityControlLoading = true;
        state.assignQualityControlError = '';
      })
      .addCase(assignQualityControl?.fulfilled, (state) => {
        state.assignQualityControlLoading = false;
        state.assignQualityControlError = '';
      })
      .addCase(assignQualityControl?.rejected, (state, action) => {
        state.assignQualityControlLoading = false;
        state.assignQualityControlError = action?.payload?.message;
      });
  }
});

export const { setSelectedQCStatus } = qualityControlSlice.actions;
export default qualityControlSlice.reducer;
