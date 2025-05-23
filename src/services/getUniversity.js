import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from 'utils/axios';

export const getAllUniversity = createAsyncThunk('university/getAllUniversity', async (dispatchNotification, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`/api/university/`);
    return response.data;
  } catch (error) {
    dispatchNotification('Failed to fetch university data!!', true);
    return rejectWithValue(error.message);
  }
});
