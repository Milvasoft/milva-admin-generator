import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';
import CustomTable from '@components/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { i18n } from 'next-i18next';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton, styled } from '@mui/material';

const ActionComponent = styled('div')(() => ({
  display: 'flex', 
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%' 
}));

export default function Home() {

  const columns: GridColDef[] = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 1 
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 1 
    },
    {
      field: 'fullName',
      headerName: 'Full name',
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
    {
      field: 'Actions',
      headerName: 'İşlemler',
      renderCell: () => (
        <ActionComponent>
              
          <Tooltip title={i18n?.t('delete') || 'delete'}>
            <IconButton>
              <DeleteIcon color="secondary" />
            </IconButton>
          </Tooltip>
                
          <Tooltip title={i18n?.t('edit') || 'edit'}>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
  
        </ActionComponent>
      )
  
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
    {
      id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 
    },
    {
      id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 
    },
    {
      id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 
    },
  ];

  return (
    <Layout>

      <CustomTable 
        columns={columns}
        rows={rows?.slice(0, 10)}
        rowCount={rows.length} 
        title="Users"
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
