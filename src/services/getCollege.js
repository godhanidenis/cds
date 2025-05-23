import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosServices from 'utils/axios';

export const getCollege = createAsyncThunk(
  'college/getCollege',
  async ({ page, university_id, year, QCStatus, signal, dispatchNotification }, { rejectWithValue }) => {
    try {
      const response = await axiosServices.get(
        `/api/university-details/?page=${page || 1}&record=10&university_id=${university_id || ''}&year=${year || ''}&qc_status__in=${
          QCStatus || ''
        }`,
        {
          signal
        }
      );
      return response.data;
    } catch (error) {
      // Normalize abort error from axios
      if (error?.canceled) {
        return rejectWithValue({ message: 'Aborted', name: 'AbortError' });
      }
      dispatchNotification('Failed to fetch college data!!', true);

      return rejectWithValue({ message: error.message || 'Something went wrong', name: error.name });
    }
  }
);
export const getSingleCollege = createAsyncThunk('college/getSingleCollege', async ({ id, dispatchNotification }, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`/api/university-details/${id}/`);
    return response.data;
  } catch (error) {
    dispatchNotification('Failed to fetch single college data!!', true);
    return rejectWithValue(error.response.data);
  }
});

export const createCollege = createAsyncThunk(
  'college/createCollege',
  async ({ payload, resetFormData, dispatchNotification }, { rejectWithValue }) => {
    try {
      const response = await axiosServices.post(`/api/university-details/`, payload);
      if (response.data) {
        dispatchNotification('College create successfully!!');
        resetFormData();
      }
      return response.data;
    } catch (error) {
      dispatchNotification('Fetching error with create college!!', true);
      return rejectWithValue(error.response.data);
    }
  }
);
