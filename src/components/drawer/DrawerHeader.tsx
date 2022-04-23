import { Clear } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React from 'react';

type props = {
    handleCancel?: () => void,
    title?: string
}

export default function DrawerHeader({ title, handleCancel }: props) {

  return (
    <>

      <Typography color="primary" textAlign="center" sx={{ fontSize: '1.5em' }}>
        {title}
      </Typography>

      <IconButton sx={{ position: 'absolute', top: '0px', right: '5px' }} onClick={handleCancel}>
        <Clear color="primary" />
      </IconButton>

    </>
  );

}
