import React, { useCallback, useRef, } from 'react';
import { IManagedTableWithProcess } from '@assets/types/ManagedTableWithProcess';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import ManagedTable from './ManagedTable';
import Process from './Process';
import TableDrawer from './TableDrawer';

export default function ManagedTableWithProcess(props:IManagedTableWithProcess) {

  const { t } = useTranslation();
  
  const newRef = useRef<any>();
  
  const handleEdit = useCallback((data: any) => newRef?.current?.setDrawer({ open: true, component: DrawerEnum.Edit, data }), []);

  const handleDelete = useCallback((data: any) => newRef?.current?.setDrawer({ open: true, component: DrawerEnum.Delete, data }), []);
  
  const columns : GridColDef[] = [
    ...props.columns,
    {
      field: 'actions',
      headerName: t('transactions'),
      renderCell: (rowData) => <Process rowData={rowData?.row} handleDelete={handleDelete} handleEdit={handleEdit} />,
    }
  ];
 
  return (
    <>

      <ManagedTable {...props} columns={columns} />

      <TableDrawer {...props} ref={newRef} />

    </>
  );

}
