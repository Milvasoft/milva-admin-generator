/* eslint-disable @typescript-eslint/ban-ts-comment */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Layout from '@components/layout/Layout';
import ManagedTableWithProcess from '@components/table/ManagedTableWithProcess';
import UserDrawer from '@src/pages/UserDrawer';
import { useCallback } from 'react';

export default function Users() {

  const columns: GridColDef[] = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'firstName',
      headerName: 'Ad',
      flex: 1 
    },
    {
      field: 'lastName',
      headerName: 'Soyad',
      flex: 1 
    },
    {
      field: 'fullName',
      headerName: 'Ad Soyad',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
  ];
  
  const rows = [
    {
      id: 1222, lastName: 'Snow', firstName: 'Jon', age: 35 
    },
    {
      id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 
    },
    {
      id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 
    },
    {
      id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 
    },
    {
      id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null 
    },
    {
      id: 6, lastName: 'Melisandre', firstName: null, age: 150 
    },
    {
      id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 
    },
    {
      id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 
    },
    {
      id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 
    },
    {
      id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 
    },
  ];

  const fetchData = async (data:any) => new Promise<any>((resolve) => {

    console.log(data);

    resolve({ result: { dtoList: rows } });    
      
  });  

  const getLabelForDeleteDrawer = (data:any) => data?.fullName;
  
  const onDelete = useCallback((handleClose:() => void, onRefreshTable?:() => void, data?: any) => {

    if (data?.id) {

      // Api request

      handleClose();

      onRefreshTable?.();
      
    } else {

      handleClose();

      onRefreshTable?.();
    
    }  
  
  }, []);  
  
  return (
    <Layout>

      <ManagedTableWithProcess 
        columns={columns}
        // @ts-ignore
        fetchData={fetchData} 
        DrawerComponent={UserDrawer}
        toolBar={{ title: 'Kullanıcılar', }}
        getLabelForDeleteDrawer={getLabelForDeleteDrawer}
        onDelete={onDelete}
      />

    </Layout>
  );

}

export async function getStaticProps({ locale }: any) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };

}
