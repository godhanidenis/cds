import { createSlice } from '@reduxjs/toolkit';
import { getAllUser } from 'services/getUser';

const initialState = {
  allUserData: [],
  userAllLoading: false,
  userAllError: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch collegeData
      .addCase(getAllUser?.pending, (state) => {
        state.userAllLoading = true;
        state.userAllError = '';
      })
      .addCase(getAllUser?.fulfilled, (state, action) => {
        state.userAllLoading = false;
        state.allUserData = action?.payload?.map((item) => ({
          key: item?.id,
          label: item?.first_name + ' ' + item?.last_name,
          value: item?.id
        }));
      })
      .addCase(getAllUser?.rejected, (state, action) => {
        state.userAllLoading = false;
        state.userAllError = action?.error?.message || 'Failed to fetch users data';
      });
  }
});

export default userSlice.reducer;
