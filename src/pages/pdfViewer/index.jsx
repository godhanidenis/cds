import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useFormik } from 'formik';
import PdfSearchViewer from 'sections/PdfSearchViewer';
import useCollegeData from 'hooks/useCollegeData/useCollegeData';
import { useParams } from 'react-router';
import useNotification from 'hooks/useNotification';
import useCategoryData from 'hooks/useCategoryData/useCategoryData';

// const formFields = [
//   { label: 'Title', value: 'title' },
//   { label: 'Description', value: 'description' }
// ];

const PdfViewerPage = () => {
  const { id, universityId } = useParams();
  console.log('universityId :>> ', universityId);
  const dispatchNotification = useNotification();
  const { CategoryAllOptions } = useCategoryData();
  console.log('CategoryAllOptions :>> ', CategoryAllOptions);
  const { getSingleCollegeData, collegeSingleData, collegeSingleLoading } = useCollegeData();

  const formik = useFormik({
    initialValues: {
      fieldKey: 'title',
      titleField1: 'Default Title 1',
      titleField2: 'Default Title 2',
      descField1: 'Default Desc 1',
      descField2: 'Default Desc 2',
      descField3: 'Default Desc 3',
      searchTerm: ''
    },
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    }
  });
  const pdfWrapperRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    id &&
      getSingleCollegeData({
        id,
        dispatchNotification
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderTitleFields = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField fullWidth label="Title Field 1" name="titleField1" value={formik.values.titleField1} onChange={formik.handleChange} />
      <TextField fullWidth label="Title Field 2" name="titleField2" value={formik.values.titleField2} onChange={formik.handleChange} />
      <Button variant="contained" type="submit">
        Submit Title
      </Button>
    </Box>
  );

  const renderDescriptionFields = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField fullWidth label="Description Field 1" name="descField1" value={formik.values.descField1} onChange={formik.handleChange} />
      <TextField fullWidth label="Description Field 2" name="descField2" value={formik.values.descField2} onChange={formik.handleChange} />
      <TextField fullWidth label="Description Field 3" name="descField3" value={formik.values.descField3} onChange={formik.handleChange} />
      <Button variant="contained" type="submit">
        Submit Description
      </Button>
    </Box>
  );

  const loadingComponent = () => (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        height: '250px'
      }}
    >
      <CircularProgress sx={{ mt: 10 }} />
    </Box>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} mds={4}>
        <MainCard
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4">JSON Data Form</Typography>
              <Stack direction="row" alignItems="center" justifyContent="start" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={(e) => e.stopPropagation()}
                  disabled={collegeSingleLoading}
                >
                  <Typography marginTop={0.2}>Toggle Raw JSON</Typography>
                </Button>
              </Stack>
            </Box>
          }
          sx={{ height: '100%' }}
        >
          {collegeSingleLoading ? (
            loadingComponent()
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              <Stack spacing={1}>
                <InputLabel htmlFor="autocomplete-category">Category List</InputLabel>
                <Autocomplete
                  id="autocomplete-category"
                  value={CategoryAllOptions.find((opt) => opt.value === formik.values.fieldKey) || null}
                  onChange={(_, newValue) => {
                    formik.setFieldValue('fieldKey', newValue?.value || '');
                  }}
                  options={CategoryAllOptions}
                  getOptionLabel={(option) => option?.label || ''}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderOption={(props, option) => (
                    <li {...props} key={option.value}>
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} fullWidth placeholder="Select a form field" />}
                />
              </Stack>
              <form onSubmit={formik.handleSubmit}>
                {formik.values.fieldKey === 'title' && renderTitleFields()}
                {formik.values.fieldKey === 'description' && renderDescriptionFields()}
              </form>
            </Box>
          )}
        </MainCard>
      </Grid>

      <Grid item xs={12} mds={8}>
        <MainCard
          contentSX={{ p: 0, pb: '32px  !important' }}
          title={<Typography variant="h4">PDF Viewer</Typography>}
          sx={{ height: '100%' }}
        >
          {collegeSingleLoading ? (
            loadingComponent()
          ) : (
            <Box display="flex" flexDirection="column" gap={2} ref={pdfWrapperRef}>
              <Box display="flex" gap={2} pt={2.5} px={2.5}>
                <TextField
                  fullWidth
                  placeholder="Enter search word"
                  name="searchTerm"
                  value={formik.values.searchTerm}
                  onChange={formik.handleChange}
                />
                <Button
                  variant="contained"
                  type="button"
                  sx={{ px: 4 }}
                  onClick={() => {
                    setSearchText(formik.values.searchTerm);
                  }}
                >
                  <Typography>Search</Typography>
                </Button>
              </Box>
              <Box>
                <PdfSearchViewer PDFUrl={`http://164.52.216.44:9000/cds/${collegeSingleData?.pdf_path}`} searchText={searchText} />
              </Box>
            </Box>
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default PdfViewerPage;
