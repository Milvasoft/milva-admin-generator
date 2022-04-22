import React from 'react';
import { IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

type props = {
    rowData?: any,
    handleEdit: (rowData: any) => void,
    handleDelete: (rowData: any) => void
}

export default function Process({ rowData, handleEdit, handleDelete }: props) {
    
  const { t } = useTranslation();

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
