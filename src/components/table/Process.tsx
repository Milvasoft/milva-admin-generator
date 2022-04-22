import React, { useCallback } from 'react';
import { IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

type props = {
    drawerRef?: any,
    rowData?: any,
}

export default function Process({ rowData, drawerRef }: props) {
    
  const { t } = useTranslation();

  const handleEdit = useCallback((data: any) => drawerRef?.setDrawer({ open: true, component: DrawerEnum.Edit, data }), [drawerRef]);

  const handleDelete = useCallback((data: any) => drawerRef?.setDrawer({ open: true, component: DrawerEnum.Delete, data }), [drawerRef]);
  
  return (
    <ActionComponent>
              
      <Tooltip title={t('delete') || 'Delete'}>
        <IconButton onClick={() => handleDelete(rowData)}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </Tooltip>
          
      <Tooltip title={t('edit') || 'Edit'}>
        <IconButton onClick={() => handleEdit(rowData)}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>

    </ActionComponent>
  );

}
