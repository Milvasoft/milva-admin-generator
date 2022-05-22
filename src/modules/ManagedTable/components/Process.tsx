import React, { useCallback } from 'react';
import { IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { useAppDispatch, } from '@utils/store';
import { IDrawerState } from '@src/modules/App/types/IDrawerState';
import PreviewIcon from '@mui/icons-material/Preview';
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
  
  const handleEdit = useCallback(
    () => (
      defaultButtons?.editButton?.click 
        ? defaultButtons?.editButton?.click(rowData)
        : openDrawer({ component: DrawerEnum.Edit, data: rowData })),
    [defaultButtons, rowData, openDrawer]
  );

  const handleDelete = useCallback(() => (
    defaultButtons?.deleteButton?.click 
      ? defaultButtons?.deleteButton?.click(rowData)
      : openDrawer({ component: DrawerEnum.Delete, data: rowData })), [defaultButtons, rowData, openDrawer]);
    
  return (
    <ActionComponent>

      {  
        defaultButtons?.editButton?.href !== undefined
          ? !defaultButtons?.editButton?.hide?.(rowData) && (
            <Tooltip title={t('edit') || 'Edit'}>
              <a href={defaultButtons?.editButton?.href || '#'}>             
                <IconButton onClick={handleEdit}>
                  <EditIcon color="primary" />
                </IconButton>
              </a>
            </Tooltip>
          )
          : !defaultButtons?.editButton?.hide?.(rowData) && (
            <Tooltip title={t('edit') || 'Edit'}>
              <IconButton onClick={handleEdit}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          )
      }
       
      { !defaultButtons?.deleteButton?.hide?.(rowData) && (
        <Tooltip title={t('delete') || 'Delete'}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      )}

      { defaultButtons?.routeButton?.show && (
        <Tooltip title={defaultButtons?.routeButton ? t(defaultButtons?.routeButton?.title) : ''}>
          <a href={defaultButtons?.routeButton?.href?.(rowData) || '#'}> 
            <PreviewIcon />
          </a>
        </Tooltip>
      )}

      {
        actions?.map((action) => !action?.isHide?.(rowData) && (                    
          <Tooltip title={action.title} key={action.title}>
            <IconButton onClick={() => openDrawer({ component: action.drawerEnum, data: rowData })}>
              {action.icon}
            </IconButton>
          </Tooltip>
        ))
      }       

    </ActionComponent>
  );

}
