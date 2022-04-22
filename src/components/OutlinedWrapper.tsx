import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function OutlinedWrapper({ label, children }:any) {

  return (
    <Box
      component="fieldset" 
      sx={{
        border: '1px solid',
        borderColor: 'action.disabled',
        borderRadius: '4px',
        m: 0, 
        p: 0.5,
        px: 1.5,
        mt: '-10px',
        '&:hover': {          
          borderColor: 'text.primary',
        }
      }}
    >

      <Typography
        component="legend" 
        sx={{
          fontSize: '12px',
          fontWeight: 400, 
          color: 'text.secondary',
          lineHeight: '1.4375em',
          px: 0.5,
        }}
      >
        {label}
      </Typography> 

      {children}

    </Box>
  );

}
