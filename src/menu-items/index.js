import { FormattedMessage } from 'react-intl';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
// import SourceIcon from '@mui/icons-material/Source';
import TuneIcon from '@mui/icons-material/Tune';
import TableChartIcon from '@mui/icons-material/TableChart';
export const adminDashboard = {
  id: 'admin_dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: DashboardIcon
    },
    {
      id: 'addCollege',
      title: <FormattedMessage id="addCollege" />,
      type: 'item',
      url: '/addCollege',
      icon: SchoolIcon
    },
    {
      id: 'dataView',
      title: <FormattedMessage id="dataView" />,
      type: 'item',
      url: '/dataView',
      icon: TableChartIcon
    },
    {
      id: 'qualityControl',
      title: <FormattedMessage id="qualityControl" />,
      type: 'item',
      url: '/qualityControl',
      icon: TuneIcon
    }
  ]
};

export const userDashboard = {
  id: 'user_dashboard',
  type: 'group',
  children: [
    {
      id: 'userDashboard',
      title: <FormattedMessage id="userDashboard" />,
      type: 'item',
      url: '/userDashboard',
      icon: DashboardIcon
    }
  ]
};
