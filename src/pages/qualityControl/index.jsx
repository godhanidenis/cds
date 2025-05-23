import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Grid, List, ListItemButton, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import SectionComponent from 'components/SectionComponent/SectionComponent';
import EmptyPlaceholder from 'components/Placeholders/emptyPlaceholder';
import { useNavigate } from 'react-router';
import { CheckCircleOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import useQualityControlData from 'hooks/useQualityControlData/useQualityControlData';
import useAuth from 'hooks/useAuth';
import useNotification from 'hooks/useNotification';

const statusIconMap = {
  pending: <QuestionCircleOutlined />,
  assigned: <InfoCircleOutlined />,
  done: <CheckCircleOutlined />
};

const labelMap = {
  assigned: 'Assign',
  pending: 'Pending',
  done: 'Completed'
};

const QualityControlPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatchNotification = useNotification();
  const {
    QCStatusOptions,
    qualityControlData,
    qualityControlLoading,
    getAllQualityControlData,
    getSelectedQualityControlData,
    selectedQualityControlData,
    selectedQualityControlLoading
  } = useQualityControlData();

  useEffect(() => {
    user?.id && getAllQualityControlData({ id: user?.id, dispatchNotification });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const tabOptions = ['pending', 'assigned', 'done']
    ?.map((key) => QCStatusOptions?.find((opt) => opt?.value === key))
    ?.filter(Boolean)
    ?.map((opt) => ({
      ...opt,
      icon: statusIconMap[opt?.value]
    }));

  const [value, setValue] = useState('pending');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (dataItem) => {
    setSelectedId(dataItem);
    getSelectedQualityControlData({ university_id: dataItem?.university?.id, year_id: dataItem?.year?.id, dispatchNotification });
  };

  const handleChange = (event, newValue) => {
    setSelectedId(null);
    setValue(newValue); // newValue is one of 'assigned', 'pending', 'done'
  };

  console.log('selectedQualityControlData', selectedQualityControlData);
  console.log('selectedQualityControlLoading', selectedQualityControlLoading);
  const dataItems = [
    { label: 'Academic Year', value: selectedQualityControlData?.academic_year },
    { label: 'Academic Year Calender', value: selectedQualityControlData?.academic_year_calendar },
    { label: 'Address', value: selectedQualityControlData?.address },
    { label: 'Admission Email', value: selectedQualityControlData?.admission_email },
    { label: 'Admission Phone', value: selectedQualityControlData?.admission_phone },
    { label: 'Enrolment Percentage', value: selectedQualityControlData?.enrolment_percentage },
    { label: 'Institute Name', value: selectedQualityControlData?.institute_name },
    { label: 'Institute Type', value: selectedQualityControlData?.institute_type }
  ];
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
    <SectionComponent title="Quality Control">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} mds={4}>
          <MainCard contentSX={{ p: '0px !important' }}>
            <Tabs
              sx={{ p: 2.5 }}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable tabs"
              allowScrollButtonsMobile
            >
              {tabOptions?.map((tab) => (
                <Tab
                  key={tab?.value}
                  value={tab?.value}
                  label={tab?.label}
                  icon={tab?.icon}
                  iconPosition="start"
                  sx={{ '&:focus-visible': { outline: 'none' } }}
                />
              ))}
            </Tabs>
            <Divider />
            {qualityControlLoading ? (
              loadingComponent()
            ) : (
              <List component="nav" sx={{ p: 2.5 }}>
                {qualityControlData?.filter((item) => item?.qc_status === value)?.length === 0 ? (
                  <EmptyPlaceholder msg={`No QC ${labelMap[value]}`} height="100px" color="#64748B" />
                ) : (
                  <>
                    <Divider />
                    {qualityControlData
                      ?.filter((item) => item?.qc_status === value)
                      ?.map((item) => (
                        <ListItemButton key={item?.id} divider selected={selectedId?.id === item?.id} onClick={() => handleSelect(item)}>
                          <ListItemText
                            primary={<Typography variant="subtitle1">{item?.university?.name}</Typography>}
                            secondary={`${item?.year?.year} CDS Report`}
                          />
                        </ListItemButton>
                      ))}
                  </>
                )}
              </List>
            )}
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} mds={8}>
          <MainCard
            {...(selectedId && {
              title: (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <span>{selectedId?.university && `${selectedId?.university}${selectedId?.year ? ` (${selectedId?.year})` : ''}`}</span>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pdfViewer/${selectedId?.id}/1`);
                    }}
                  >
                    <Typography marginTop={0.2}>Edit Data</Typography>
                  </Button>
                </Box>
              )
            })}
          >
            {!selectedId ? (
              <EmptyPlaceholder msg={`No Have QC Data For ${labelMap[value]}`} height="100px" color="#64748B" />
            ) : (
              <Grid container spacing={2}>
                {dataItems?.map((item, index) => (
                  <Grid item xs={12} sms={6} sm={12} mds={6} key={index}>
                    <MainCard>
                      <Typography color="textSecondary" variant="h6">
                        {item?.label}
                      </Typography>
                      <Typography variant="h5">{item?.value}</Typography>
                    </MainCard>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            )}
          </MainCard>
        </Grid>
      </Grid>
    </SectionComponent>
  );
};

export default QualityControlPage;
