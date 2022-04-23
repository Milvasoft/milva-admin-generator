import React, { useCallback, useRef, } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { IManagedTableWithProcess } from '@assets/types/IManagedTableWithProcess';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import Process from './Process';
import TableDrawer from './TableDrawer';
import AutoTable from './AutoTable';

export default function ManagedTableWithProcess(props:IManagedTableWithProcess) {

  const { t } = useTranslation();
  
  const drawerRef = useRef<any>();
  
  const openDrawer = useCallback((component: DrawerEnum, data?: any) => drawerRef?.current?.setDrawer({ open: true, component, data }), [drawerRef]);

  const columns : GridColDef[] = [
    ...props.columns,
    {
      field: 'actions',
      headerName: t('transactions'),
      renderCell: (rowData) => <Process rowData={rowData?.row} openDrawer={openDrawer} />,
    }
  ];
   
  return (
    <>

      <AutoTable {...props} columns={columns} toolBar={{ ...props.toolBar, openDrawer }} />

      <TableDrawer {...props} ref={drawerRef} />

    </>
  );

}
