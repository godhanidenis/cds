/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Box, Button, Checkbox, Chip, Grid, InputLabel, Stack, TextField, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import MainCard from 'components/MainCard';
import SectionComponent from 'components/SectionComponent/SectionComponent';
import { useEffect, useMemo, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CommonTable from 'components/commonTable/commonTable';
import PropTypes from 'prop-types';
import IconButton from 'components/@extended/IconButton';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useNavigate } from 'react-router';
import useCollegeData from 'hooks/useCollegeData/useCollegeData';
import useReportYearData from 'hooks/useReportYearData/useReportYearData';
import useQualityControlData from 'hooks/useQualityControlData/useQualityControlData';
import useUniversityData from 'hooks/useUniversityData/useUniversityData';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import AssignedModal from 'components/modals/assignedModal/assignedModal';
import useNotification from 'hooks/useNotification';

const DataViewPage = () => {
  const { allUniversityData, allUniversityLoading, getAllUniversityData, selectedUniversity, setSelectedUniversityData } =
    useUniversityData();
  const { getCollegeData, collegeData, collegeTotalRecords, collegeLoading } = useCollegeData();
  const { getAllYearData, setSelectedYearData, selectedYear, allYearData, allYearLoading } = useReportYearData();
  const { QCStatusOptions, setSelectedQCStatusData, selectedQCStatus } = useQualityControlData();
  const dispatchNotification = useNotification();
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isApiCallDo, setIsApiCallDo] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [assignedModalOpen, setAssignedModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      year: selectedYear,
      university: selectedUniversity,
      QCStatus: selectedQCStatus
    }
  });

  // Sync selected values to form
  useEffect(() => {
    formik.setValues({
      university: selectedUniversity,
      year: selectedYear,
      QCStatus: selectedQCStatus
    });
  }, [selectedUniversity, selectedYear, selectedQCStatus]);

  // Fetch base data
  useEffect(() => {
    getAllUniversityData({ dispatchNotification });
    getAllYearData({ dispatchNotification });
  }, []);

  const fields = [
    {
      label: 'College',
      name: 'university',
      options: !allUniversityLoading ? allUniversityData : [],
      placeholder: 'Select College',
      loading: allUniversityLoading,
      onChange: setSelectedUniversityData
    },
    {
      label: 'Report Year',
      name: 'year',
      options: !allYearLoading ? allYearData : [],
      placeholder: 'Select Year',
      loading: allYearLoading,
      onChange: setSelectedYearData
    },
    {
      label: 'QC Status',
      name: 'QCStatus',
      options: QCStatusOptions,
      placeholder: 'Select QC Status',
      onChange: setSelectedQCStatusData
    }
  ];

  const fetchData = async () => {
    if (abortController) {
      abortController.abort();
    }

    // Create a new abort controller for the new request
    const controller = new AbortController();
    setAbortController(controller);
    getCollegeData({
      page,
      university_id: formik?.values?.university,
      year: formik?.values?.year,
      QCStatus: formik?.values?.QCStatus,
      signal: controller?.signal,
      dispatchNotification
    });
    setIsApiCallDo(true);
  };

  const handleSelectedRowsChange = (selectedRows) => {
    const notAssignedSelectedIds = selectedRows.filter((row) => row.original.qc_status === 'not_assigned').map((row) => row.original.id);
    setSelectedRowIds(notAssignedSelectedIds);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    isApiCallDo && page === 1 ? fetchData() : setPage(1);
  }, [formik?.values]);

  const StatusCell = ({ value }) => {
    switch (value) {
      case 'pending':
        return <Chip color="warning" label="Pending" size="small" variant="light" />;
      case 'done':
        return <Chip color="success" label="Completed" size="small" variant="light" />;
      case 'assigned':
        return <Chip color="info" label="Assigned" size="small" variant="light" />;
      default:
        return <Chip color="secondary" label="Not Assigned" size="small" variant="light" />;
    }
  };

  const ActionCell = (row, theme) => {
    const collapseIcon = row.isExpanded ? (
      <CloseOutlined sx={{ color: theme.palette.error.main }} />
    ) : (
      <VisibilityTwoToneIcon sx={{ color: theme.palette.secondary.main }} />
    );

    return (
      <Stack direction="row" alignItems="center" justifyContent="start" spacing={0}>
        <Tooltip title="View Data">
          <IconButton
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pdfViewer/${row?.original?.id}/${row?.original?.university?.id}`);
            }}
          >
            {collapseIcon}
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };

  StatusCell.propTypes = {
    value: PropTypes.string.isRequired
  };

  const CollegeCell = ({ value }) => (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{value || '-'}</div>
  );
  CollegeCell.propTypes = {
    value: PropTypes.any
  };

  const SelectionCell = ({ row }) =>
    row?.original?.qc_status === 'not_assigned' && <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;

  SelectionCell.propTypes = {
    row: PropTypes.object
  };

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true
      },
      {
        Header: 'College',
        accessor: (row) => row?.university?.name || '-',
        Cell: CollegeCell
      },
      {
        Header: 'Year',
        accessor: (row) => row?.year?.year || '-'
      },
      {
        Header: 'File Type',
        accessor: (row) => row?.pdf_path?.split('.')?.pop() || '-'
      },
      {
        Header: 'QC Status',
        accessor: 'qc_status',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        width: 100,
        Cell: ({ row }) => ActionCell(row, theme)
      }
    ],
    // eslint-disable-next-line prettier/prettier
    [theme]
  );

  return (
    <SectionComponent title="Data View">
      <MainCard title="CDS Reports Data">
        <Box display="flex" flexDirection="column" gap={3}>
          <form id="cds-reports-data-forms">
            <Grid container spacing={3}>
              {fields?.map((field, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={`autocomplete-${index}`}>{field?.label}</InputLabel>
                    <Autocomplete
                      multiple
                      limitTags={1}
                      disableCloseOnSelect
                      id={`autocomplete-${index}`}
                      value={field?.options?.filter((opt) => formik?.values[field?.name]?.includes(opt?.value))}
                      onChange={(_, newValue) => {
                        const isSelectAllClicked = newValue?.some((val) => val?.key === 'static');
                        const allOptions = field?.options?.filter((opt) => opt?.key !== 'static');
                        let selected;

                        if (isSelectAllClicked) {
                          const allSelected = formik?.values[field?.name]?.length === allOptions?.length;
                          selected = allSelected ? [] : allOptions?.map((opt) => opt?.value);
                        } else {
                          selected = newValue?.map((val) => val?.value);
                        }

                        field?.onChange(selected);
                      }}
                      options={[
                        ...(field?.loading || !(field?.options?.length > 0)
                          ? []
                          : [{ label: 'Select All', value: 'select_all', key: 'static' }]),
                        ...(field?.options || [])
                      ]}
                      loading={field?.loading}
                      getOptionLabel={(option) => option?.label || ''}
                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                      renderOption={(props, option, { selected }) => {
                        const isSelectAll = option?.key === 'static';
                        const allOptionsSelected =
                          field?.options?.filter((opt) => opt?.key !== 'static')?.length === formik?.values[field?.name]?.length;

                        const isChecked = isSelectAll ? allOptionsSelected : selected;

                        return (
                          <li
                            {...props}
                            key={option?.value}
                            style={{
                              backgroundColor: isChecked ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                              marginBottom: 1
                            }}
                          >
                            <Checkbox id={`autocomplete-${option?.value}`} style={{ marginRight: 8 }} checked={isChecked} />
                            {option?.label}
                          </li>
                        );
                      }}
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
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </form>
          {selectedRowIds.length > 0 && (
            <Box display="flex" justifyContent="end">
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={() => setAssignedModalOpen(true)}>
                Add Assign
              </Button>
            </Box>
          )}
          {assignedModalOpen && (
            <AssignedModal
              selectedRowIds={selectedRowIds}
              fetchData={() => (page === 1 ? fetchData() : setPage(1))}
              assignedModalOpen={assignedModalOpen}
              setAssignedModalOpen={setAssignedModalOpen}
              setSelectedRowIds={setSelectedRowIds}
            />
          )}
          <CommonTable
            columns={columns}
            data={collegeData}
            getHeaderProps={(column) => column.getSortByToggleProps()}
            totalRecords={collegeTotalRecords}
            page={page}
            setPage={setPage}
            loading={collegeLoading}
            isPagination={true}
            onSelectedRowsChange={handleSelectedRowsChange}
          />
        </Box>
      </MainCard>
    </SectionComponent>
  );
};

export default DataViewPage;
