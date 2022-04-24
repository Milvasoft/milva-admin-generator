import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import Table from './Table';
import Process from './Process';
import Drawer from './Drawer';
import { IManagedTable } from '../types/IManagedTable';

export default function ManagedTable(props:IManagedTable) {

  const { t } = useTranslation();
  
  const columns : GridColDef[] = [
    ...props.columns,
    {
      field: 'actions',
      headerName: t('transactions'),
      renderCell: (rowData) => <Process rowData={rowData?.row} actions={props.actions} defaultButtons={props.defaultButtons} />,
    }
  ];
   
  return (
    <>

      <Table 
        columns={columns} 
        toolBar={props.toolBar}
        fetchData={props.fetchData}
        fetchPaginationData={props.fetchPaginationData}
        dataGridProps={props.dataGridProps}
      />

      <Drawer
        DrawerComponent={props.DrawerComponent} 
        onDelete={props?.onDelete} 
        getLabelForDeleteDrawer={props?.getLabelForDeleteDrawer} 
      />

    </>
  );

}
