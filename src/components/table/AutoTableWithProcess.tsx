import React, { useCallback, useRef, } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IAutoTableWithProcess } from '@assets/types/IAutoTableWithProcess';
import Process from './Process';
import TableDrawer from './TableDrawer';
import AutoTable from './AutoTable';

export default function ManagedTableWithProcess(props:IAutoTableWithProcess) {

  const { t } = useTranslation();
  
  const drawerRef = useRef<any>();

  const tableRef = useRef<any>(); 
  
  const openDrawer = useCallback((component: DrawerEnum, data?: any) => drawerRef?.current?.setDrawer({ open: true, component, data }), [drawerRef]);
  
  const onRefreshTable = useCallback(() => tableRef?.current?.onRefresh(), []);

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

      <AutoTable 
        {...props} 
        ref={tableRef}
        columns={columns} 
        toolBar={{ ...props.toolBar, openDrawer }}
      />

      <TableDrawer
        ref={drawerRef}
        DrawerComponent={props.DrawerComponent} 
        onDelete={props?.onDelete} 
        getLabelForDeleteDrawer={props?.getLabelForDeleteDrawer} 
        onRefreshTable={onRefreshTable}
      />

    </>
  );

}
