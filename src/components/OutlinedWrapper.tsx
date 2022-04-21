import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function OutlinedWrapper({ label, children }:any) {

  return (
    <Box
      component="fieldset" 
      sx={{
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '4px',
        m: 0, 
        p: 0.5,
        px: 1.5,
        mt: '-10px'
      }}
    >

      <Typography
        component="legend" 
        sx={{
          fontSize: '12px',
          fontWeight: 400, 
          color: 'rgba(0, 0, 0, 0.6)',
          lineHeight: '1.4375em',
          px: 0.5
        }}
      >
        {label}
      </Typography> 

      {children}

    </Box>
  );

}
