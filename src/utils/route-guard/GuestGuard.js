import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={user?.role?.name === 'User' ? '/userDashboard' : APP_DEFAULT_PATH} replace />;
  }

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
