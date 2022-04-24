import React, { useCallback } from 'react';
import { IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { useAppDispatch, } from '@utils/store';
import { IDrawerState } from '@assets/types/IDrawerState';
import { openTableDrawer } from '../redux/slice';
import { IManagedTableActions } from '../types/IManagedTableActions';
import { IManagedTableDefaultButtons } from '../types/IManagedTableDefaultButtons';

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

type props = {
    rowData?: any,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons
}

export default function Process({
  rowData,
  actions,
  defaultButtons 
}: props) {
    
  const { t } = useTranslation();

  const dispatch = useAppDispatch(); 

  const openDrawer = useCallback((param: IDrawerState) => dispatch(openTableDrawer(param)), [dispatch]);
  
  const handleEdit = useCallback(() => openDrawer({ component: DrawerEnum.Edit, data: rowData }), [rowData, openDrawer]);

  const handleDelete = useCallback(() => openDrawer({ component: DrawerEnum.Delete, data: rowData }), [rowData, openDrawer]);
    
  return (
    <ActionComponent>

      {
        actions?.map((action) => !action?.isHide?.(rowData) && (                    
          <Tooltip title={action.title} key={action.title}>
            <IconButton onClick={() => openDrawer({ component: action.drawerEnum, data: rowData })}>
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
