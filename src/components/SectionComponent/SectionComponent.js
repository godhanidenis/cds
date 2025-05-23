import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const SectionComponent = ({ title, children, titleStyle, contentStyle }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ ...titleStyle, color: '#262626', fontSize: 30, fontWeight: 600 }}>{title}</Box>
      <Box sx={{ ...contentStyle }}>{children}</Box>
    </Box>
  );
};

SectionComponent.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  children: PropTypes.node
};

export default SectionComponent;
