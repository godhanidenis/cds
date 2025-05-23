import { Box, Button, Grid, Typography } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MainCard from 'components/MainCard';
import SectionComponent from 'components/SectionComponent/SectionComponent';
import { useNavigate } from 'react-router';

const DashboardPage = () => {
  const navigate = useNavigate();

  const analyticsData = [
    { title: 'Colleges', count: '5' },
    { title: 'Total Files', count: '12', extra: 'PDF: 5 | MD: 4 | JSON:3' },
    { title: 'QC Status', count: '67%', extra: 'Pending: 2 | Completed: 4' },
    { title: 'Recent Activity', count: '8', extra: 'In the last 7 days' }
  ];

  const buttonsData = [
    { label: 'Upload New CDS Report', color: 'primary', path: '/addCollege' },
    { label: 'View Data Reports', color: 'secondary', path: '/dataView' },
    { label: 'Pending QC Tasks', color: 'info', path: '/qualityControl' }
  ];

  return (
    <SectionComponent title="Dashboard">
      <Box display="flex" flexDirection="column" gap={3}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard Overview</Typography>
          </Grid>
          {analyticsData?.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <AnalyticEcommerce title={item?.title} count={item?.count} extra={item?.extra} />
            </Grid>
          ))}
        </Grid>
        <MainCard title="Quick Actions">
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {buttonsData?.map((button, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Button variant="contained" color={button?.color} fullWidth onClick={() => navigate(button?.path)}>
                  {button?.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </Box>
    </SectionComponent>
  );
};

export default DashboardPage;
