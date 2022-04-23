import DrawerFooter from '@components/drawer/DrawerFooter';
import DrawerLayout from '@components/drawer/DrawerLayout';
import { Typography } from '@mui/material';
import React from 'react';

type props = {
  handleClose: () => void,
  onRefreshTable?: () => void,
  handleConfirm?: (handleClose:() => void, onRefreshTable?:() => void, data?: any) => void,
  getLabelForDeleteDrawer?: (data?:any) => string,
  data?: any
}

export default function DeleteDrawer({
  handleClose,
  handleConfirm,
  getLabelForDeleteDrawer,
  data,
  onRefreshTable
}:props) {
  

  return (
    <DrawerLayout title="Veri Sil" handleCancel={handleClose}>

      <Typography sx={{ mt: 3, fontWeight: 'bold' }} textAlign="center">
        {getLabelForDeleteDrawer ? getLabelForDeleteDrawer(data) : 'any'}
      </Typography>

      <Typography sx={{ mt: 2 }} textAlign="center">
        verisini silmek istediğinize emin misiz ?
      </Typography>

      <DrawerFooter
        handleConfirm={() => handleConfirm?.(handleClose, onRefreshTable, data)}
        handleCancel={handleClose}
      />

    </DrawerLayout>
  );

}
