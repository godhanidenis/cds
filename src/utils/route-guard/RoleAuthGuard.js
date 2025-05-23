import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const RoleAuthGuard = ({ userRole, children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || user?.role?.name !== userRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

RoleAuthGuard.propTypes = {
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default RoleAuthGuard;
