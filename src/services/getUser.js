import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from 'utils/axios';

export const getAllUser = createAsyncThunk('user/getAllUser', async (dispatchNotification, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`api/user/`);
    return response.data;
  } catch (error) {
    dispatchNotification('Failed to fetch users data!!', true);
    return rejectWithValue(error.message);
  }
});
