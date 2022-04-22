import React, { useCallback } from 'react';
import { IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IManagedTableActions } from '@assets/types/IManagedTableActions';
import { IManagedTableDefaultButtons } from '@assets/types/IManagedTableDefaultButtons';

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

type props = {
    openDrawer: (component: DrawerEnum, data?: any) => void,
    rowData?: any,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons
}

export default function Process({
  rowData,
  openDrawer,
  actions,
  defaultButtons 
}: props) {
    
  const { t } = useTranslation();
  
  const handleEdit = useCallback(() => openDrawer(DrawerEnum.Edit, rowData), [openDrawer, rowData]);

  const handleDelete = useCallback(() => openDrawer(DrawerEnum.Delete, rowData), [openDrawer, rowData]);
    
  return (
    <ActionComponent>

      {
        actions?.map((action) => !action?.isHide?.(rowData) && (                    
          <Tooltip title={action.title} key={action.title}>
            <IconButton onClick={() => openDrawer(action.drawerEnum, rowData)}>
              {action.icon}
            </IconButton>
          </Tooltip>
        ))
      }
              
      { !defaultButtons?.isDeleteHide?.(rowData) && (
        <Tooltip title={t('delete') || 'Delete'}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      )}

      { !defaultButtons?.isEditHide?.(rowData) && (
        <Tooltip title={t('edit') || 'Edit'}>
          <IconButton onClick={handleEdit}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}

    </ActionComponent>
  );

}
