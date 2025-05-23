// useNotification.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';

const useNotification = () => {
  const dispatch = useDispatch();

  return useCallback(
    (message, isError = false) => {
      dispatch(
        openSnackbar({
          open: true,
          message,
          variant: 'alert',
          alert: { color: isError ? 'error' : 'success' },
          close: true
        })
      );
    },
    [dispatch]
  );
};

export default useNotification;
