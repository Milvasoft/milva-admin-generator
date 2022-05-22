import { Clear } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import React from 'react';
import DrawerInfo from './DrawerInfo';

type props = {
    handleCancel?: () => void,
    title?: string,
    drawerInfo?: any
}

export default function DrawerHeader({ title, handleCancel, drawerInfo }: props) {

  return (
    <>

      {(drawerInfo?.creationDate 
      || drawerInfo?.creatorUser 
      || drawerInfo?.lastModifierUser 
      || drawerInfo?.lastModificationDate
      ) && <DrawerInfo data={drawerInfo} /> }

      <Typography color="primary" textAlign="center" sx={{ fontSize: '1.5em' }}>
        {title}
      </Typography>

      <IconButton sx={{ position: 'absolute', top: '0px', right: '5px' }} onClick={handleCancel}>
        <Clear color="primary" />
      </IconButton>

    </>
  );

}
