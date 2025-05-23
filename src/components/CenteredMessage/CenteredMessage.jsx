import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const CenteredMessage = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        zIndex: 10,
        textAlign: 'center',
        px: 2
      }}
    >
      <Typography variant="h6" color="textSecondary">
        {children}
      </Typography>
    </Box>
  );
};
CenteredMessage.propTypes = {
  children: PropTypes.node.isRequired
};

export default CenteredMessage;
