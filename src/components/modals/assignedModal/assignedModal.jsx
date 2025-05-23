import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useUserData from 'hooks/useUserData/useUserData';
import useQualityControlData from 'hooks/useQualityControlData/useQualityControlData';
import useNotification from 'hooks/useNotification';
import LoadingButton from 'components/@extended/LoadingButton';
// import moment from 'moment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';

const validationSchema = yup.object({
  user: yup.number().required('User is required'),
  dueDate: yup.date().required('Due Date is required')
});

const AssignedModal = ({ selectedRowIds, fetchData, assignedModalOpen, setAssignedModalOpen, setSelectedRowIds }) => {
  const theme = useTheme();
  const dispatchNotification = useNotification();
  const { assignQualityControlData, assignQualityControlLoading } = useQualityControlData();
  const { allUserData, userAllLoading, getAllUserData } = useUserData();

  const assignedModalClose = () => {
    setAssignedModalOpen(false);
    formik.resetForm();
  };

  useEffect(() => {
    assignedModalOpen && getAllUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedModalOpen]);

  const formik = useFormik({
    initialValues: {
      user: '',
      dueDate: moment().toDate()
    },

    validationSchema,
    onSubmit: async (values) => {
      const payload = { user: values?.user, due_date: moment(values?.dueDate), university_details: selectedRowIds };

      const onSuccess = () => {
        setSelectedRowIds([]);
        assignedModalClose();
        fetchData();
      };
      assignQualityControlData({ payload, onSuccess, dispatchNotification });
    }
  });

  return (
    <div>
      {assignedModalOpen && (
        <Dialog
          maxWidth="sm"
          TransitionComponent={PopupTransition}
          keepMounted
          fullWidth
          onClose={assignedModalClose}
          open={assignedModalOpen}
          sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
          aria-describedby="alert-dialog-slide-description"
        >
          <form onSubmit={formik?.handleSubmit} id="assign-user">
            <DialogTitle>New Assigned</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="autocomplete-assign-user">User</InputLabel>
                      <Autocomplete
                        id="autocomplete-assign-user"
                        value={allUserData?.find((opt) => opt?.value === formik?.values?.user) || null}
                        onChange={(_, newValue) => formik?.setFieldValue('user', newValue?.value || '')}
                        options={allUserData}
                        loading={userAllLoading}
                        getOptionLabel={(option) => option?.label || ''}
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        renderOption={(props, option) => (
                          <li {...props} key={option?.value}>
                            {option?.label}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            placeholder="Select User"
                            sx={{
                              '& .MuiAutocomplete-input.Mui-disabled': {
                                WebkitTextFillColor: theme.palette.text.primary
                              }
                            }}
                          />
                        )}
                      />
                      {formik?.touched?.user && formik?.errors?.user && (
                        <FormHelperText error id={`helper-text-user`}>
                          {formik?.errors?.user}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="due-date">Due Date</InputLabel>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={formik?.values?.dueDate}
                        onChange={(newValue) => {
                          console.log('newValue :>> ', moment(newValue));
                          formik.setFieldValue('dueDate', newValue);
                        }}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                      />
                      {formik?.touched?.dueDate && formik?.errors?.dueDate && (
                        <FormHelperText error id={`helper-text-dueDate`}>
                          {formik?.errors?.dueDate}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </DialogContent>

            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button onClick={assignedModalClose}>Cancel</Button>
                <LoadingButton
                  loading={assignQualityControlLoading}
                  loadingPosition="end"
                  variant="contained"
                  type="submit"
                  endIcon={<span style={{ marginLeft: assignQualityControlLoading ? '8px' : '0px' }} />}
                  disabled={formik?.isSubmitting}
                >
                  Assign
                </LoadingButton>
              </Stack>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </div>
  );
};
AssignedModal.propTypes = {
  fetchData: PropTypes.func,
  assignedModalOpen: PropTypes.bool,
  setAssignedModalOpen: PropTypes.func,
  setSelectedRowIds: PropTypes.func,
  selectedRowIds: PropTypes.array
};

export default AssignedModal;
