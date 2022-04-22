import React, { useRef, } from 'react';
import { IManagedTableWithProcess } from '@assets/types/ManagedTableWithProcess';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import ManagedTable from './ManagedTable';
import Process from './Process';
import TableDrawer from './TableDrawer';

export default function ManagedTableWithProcess(props:IManagedTableWithProcess) {

  const { t } = useTranslation();
  
  const drawerRef = useRef<any>();

  const columns : GridColDef[] = [
    ...props.columns,
    {
      field: 'actions',
      headerName: t('transactions'),
      renderCell: (rowData) => <Process rowData={rowData?.row} drawerRef={drawerRef.current} />,
    }
  ];
 
  return (
    <>

      <ManagedTable {...props} columns={columns} />

      <TableDrawer {...props} ref={drawerRef} />

    </>
  );

}
