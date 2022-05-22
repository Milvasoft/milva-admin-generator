import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { Box } from '@mui/material';
import Table from './Table';
import Process from './Process';
import Drawer from './Drawer';
import { IManagedTable } from '../types/IManagedTable';

export default function ManagedTable(props:IManagedTable) {

  const { t } = useTranslation();
  
  const columns : GridColDef[] = [
    {
      field: 'actions',
      headerName: t('transactions'),
      renderCell: (rowData) => <Process rowData={rowData?.row} actions={props.actions} defaultButtons={props.defaultButtons} />,
      width: (Number((props?.actions?.length || 0) + 2) * 50) 
    },
    ...props.columns,
  ];
   
  return (
    <Box sx={{ height: '100%', minWidth: 750 }}>

      <Table 
        columns={columns} 
        toolBar={props?.toolBar}
        fetchPaginationData={props.fetchPaginationData}
        fetchData={props.fetchData}
        dataGridProps={props?.dataGridProps}
        filterData={props?.filterData}
      />

      <Drawer
        DrawerComponent={props?.DrawerComponent} 
        drawerPaperSx={props?.drawerPaperSx} 
        onDelete={props?.onDelete} 
        getLabelForDeleteDrawer={props?.getLabelForDeleteDrawer} 
        actions={props?.actions}
        buttons={props?.toolBar?.buttons}
      />

    </Box>
  );

}
