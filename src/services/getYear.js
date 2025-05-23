import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from 'utils/axios';

export const getAllYear = createAsyncThunk('year/getAllYear', async (dispatchNotification, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`/api/academic-year/`);
    return response.data;
  } catch (error) {
    dispatchNotification('Failed to fetch year data!!', true);
    return rejectWithValue(error.message);
  }
});
