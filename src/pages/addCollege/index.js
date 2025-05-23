import { useTheme } from '@mui/material/styles';
import { Autocomplete, Checkbox, FormControlLabel, FormHelperText, Grid, InputLabel, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import SectionComponent from 'components/SectionComponent/SectionComponent';
import useNotification from 'hooks/useNotification';
import useCollegeData from 'hooks/useCollegeData/useCollegeData';
import LoadingButton from 'components/@extended/LoadingButton';
import { useEffect, useRef } from 'react';
import useReportYearData from 'hooks/useReportYearData/useReportYearData';
import useUniversityData from 'hooks/useUniversityData/useUniversityData';

const isMarkdownFile = (file) => {
  if (!file) return false;

  const allowedTypes = ['text/markdown', 'text/x-markdown', 'text/plain'];
  const fileType = file.type;
  const fileName = file.name || '';

  return allowedTypes.includes(fileType) || (fileType === '' && fileName.toLowerCase().endsWith('.md'));
};

const validationSchema = yup.object({
  year: yup.number().required('Report year is required'),
  university: yup.number().required('College is required'),
  CDSPdf: yup
    .mixed()
    .required('CDS Pdf is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return value && value.type === 'application/pdf';
    }),
  CDSMarkdown: yup
    .mixed()
    .required('CDS Markdown is required')
    .test('fileType', 'Only Markdown (.md) files are allowed', (value) => isMarkdownFile(value)),
  CDSJson: yup
    .mixed()
    .required('CDS Json is required')
    .test('fileType', 'Only JSON files are allowed', (value) => {
      return value && value.type === 'application/json';
    })
});

const AddCollegePage = () => {
  const { createCollegeData, createCollegeLoading } = useCollegeData();
  const { getAllYearData, allYearData, allYearLoading } = useReportYearData();
  const { allUniversityData, allUniversityLoading, getAllUniversityData } = useUniversityData();

  const inputRef = useRef({
    pdfInputRef: null,
    mdInputRef: null,
    jsonInputRef: null
  });
  const dispatchNotification = useNotification();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      year: '',
      university: '',
      automaticFile: false,
      CDSPdf: null,
      CDSMarkdown: null,
      CDSJson: null
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = new FormData();
      payload.append('university', values?.university || '');
      payload.append('year', values?.year || '');

      if (values?.CDSPdf) payload.append('pdf_path', values?.CDSPdf);
      if (values?.CDSMarkdown) payload.append('md_path', values?.CDSMarkdown);
      if (values?.CDSJson) payload.append('json_path', values?.CDSJson);

      const resetFormData = () => {
        resetForm();
        const { pdfInputRef, mdInputRef, jsonInputRef } = inputRef.current;
        [pdfInputRef, mdInputRef, jsonInputRef].forEach((ref) => {
          if (ref) ref.value = '';
        });
      };

      createCollegeData({ payload, resetFormData, dispatchNotification });
    }
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files?.[0] || null;
    formik?.setFieldValue(name, file);
  };

  useEffect(() => {
    getAllUniversityData({ dispatchNotification });
    getAllYearData({ dispatchNotification });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = [
    {
      label: 'College',
      name: 'university',
      options: !allUniversityLoading ? allUniversityData : [],
      placeholder: 'Select College',
      type: 'autocomplete',
      loading: allUniversityLoading
    },
    {
      label: 'Report Year',
      name: 'year',
      options: !allYearLoading ? allYearData : [],
      placeholder: 'Select Year',
      type: 'autocomplete',
      loading: allYearLoading
    },
    {
      label: 'CDS Report (PDF)',
      name: 'CDSPdf',
      placeholder: 'Select CDS PDF',
      type: 'file',
      fileType: '.pdf',
      helperText: 'Only PDF files are accepted',
      inputRef: (el) => (inputRef.current.pdfInputRef = el)
    },
    {
      label: 'CDS Report (MARKDOWN)',
      name: 'CDSMarkdown',
      placeholder: 'Select CDS MARKDOWN',
      type: 'file',
      fileType: '.md',
      helperText: 'Only Markdown (.md) files are accepted',
      inputRef: (el) => (inputRef.current.mdInputRef = el)
    },
    {
      label: 'CDS Report (JSON)',
      name: 'CDSJson',
      placeholder: 'Select CDS JSON',
      type: 'file',
      fileType: '.json',
      helperText: 'Only JSON files are accepted',
      inputRef: (el) => (inputRef.current.jsonInputRef = el)
    }
  ];

  return (
    <SectionComponent title="Add College CDS Report">
      <MainCard title="Upload New CDS Report">
        <form
          onSubmit={formik?.handleSubmit}
          id="add-college-forms"
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <Grid
            container
            direction="column"
            spacing={3.5}
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '60%',
                lg: '50%'
              },
              maxWidth: '100%'
            }}
          >
            {fields?.map((field, index) => (
              <Grid item xs={12} key={index}>
                <Stack spacing={1}>
                  <InputLabel htmlFor={`autocomplete-${index}`}>{field?.label}</InputLabel>
                  {field?.type === 'autocomplete' ? (
                    <>
                      <Autocomplete
                        id={`autocomplete-${index}`}
                        value={field?.options?.find((opt) => opt?.value === formik?.values[field?.name]) || null}
                        onChange={(_, newValue) => formik?.setFieldValue(field?.name, newValue?.value || '')}
                        options={field?.options}
                        loading={field?.loading}
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
                            placeholder={field?.placeholder}
                            sx={{
                              '& .MuiAutocomplete-input.Mui-disabled': {
                                WebkitTextFillColor: theme.palette.text.primary
                              }
                            }}
                          />
                        )}
                      />
                      {formik?.touched[field?.name] && formik?.errors[field?.name] && (
                        <FormHelperText error id={`helper-text-${field?.name}`}>
                          {formik?.errors[field?.name]}
                        </FormHelperText>
                      )}
                    </>
                  ) : field?.type === 'file' ? (
                    <>
                      <TextField
                        type="file"
                        id={`autocomplete-${index}`}
                        name={field?.name}
                        inputRef={field?.inputRef}
                        inputProps={{ accept: field?.fileType }}
                        onChange={handleFileChange}
                      />
                      {formik?.touched[field?.name] && formik?.errors[field?.name] ? (
                        <FormHelperText error id={`helper-text-${field?.name}`}>
                          {formik?.errors[field?.name]}
                        </FormHelperText>
                      ) : (
                        <FormHelperText sx={{ color: 'gray' }}>{field?.helperText}</FormHelperText>
                      )}
                    </>
                  ) : null}
                </Stack>
              </Grid>
            ))}

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="automaticFile" checked={formik?.values?.automaticFile} onChange={formik?.handleChange} />
                }
                label="Automatically process file (convert to markdown and extract data)"
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                loading={createCollegeLoading}
                loadingPosition="end"
                endIcon={<span />}
                variant="contained"
                fullWidth
                type="submit"
                disabled={formik?.isSubmitting}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </SectionComponent>
  );
};

export default AddCollegePage;
