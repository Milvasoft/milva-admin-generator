import DrawerFooter from '@components/drawer/DrawerFooter';
import DrawerLayout from '@components/drawer/DrawerLayout';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@utils/store';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import { closeTableDrawer } from '../redux/slice';

type props = {
  onDelete?: () => void,
  getLabelForDeleteDrawer?: (data?:any) => string,
}

export default function DeleteDrawer({
  onDelete,
  getLabelForDeleteDrawer,
}:props) {

  const { t } = useTranslation();
  
  const selectedData = useAppSelector((s) => s.managedTable?.drawer.data);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(closeTableDrawer()), [dispatch]);  

  return (
    <DrawerLayout title={t('deleteData')} handleCancel={handleClose}>

      {getLabelForDeleteDrawer && (
        <Typography sx={{ mt: 3, fontWeight: 'bold' }} textAlign="center">
          {getLabelForDeleteDrawer(selectedData)}
        </Typography>
      ) }

      <Typography sx={{ mt: 2 }} textAlign="center">
        {t('deleteDataInfo')}
      </Typography>

      <DrawerFooter handleConfirm={onDelete} handleCancel={handleClose} />

    </DrawerLayout>
  );

}
