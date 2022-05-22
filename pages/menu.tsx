/* eslint-disable no-restricted-syntax */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GridColDef } from '@mui/x-data-grid';
import Layout from '@components/layout/Layout';
import { useTranslation } from 'next-i18next';
import { useCallback, useMemo } from 'react';
// import { deleteMenuAPI, getAllMenusAPI } from '@src/modules/general/api/administration';
// import { IMenuDTO } from '@src/modules/general/types/MenuDTOs/IMenuDTO';
import ManagedTable from '@src/modules/ManagedTable/components/ManagedTable';
// import MenuDrawer from '@src/modules/general/components/MenuDrawer';
import { useAppDispatch, useAppSelector } from '@utils/store';
// import { refreshTable } from '@src/modules/ManagedTable/redux/slice';
// import checkAuthority from '@helpers/checkAuthority';
// import { Permissions } from '@assets/enums/Permissions';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { IFormGenerator } from '@src/modules/App/types/IFormGenerator';

export default function Announcements() {

  const data = useAppSelector((s) => s.managedTable?.drawer?.data);

  const spec = useAppSelector((s) => s.managedTable?.dataInfo?.spec);

  //   const defaultSystemLanguageId = useAppSelector((s) => s.appReducer.user?.systemParametersDTO.defaultSystemLanguageId);

  const { t } = useTranslation();
  
  const dispatch = useAppDispatch();

  const columns: GridColDef<any>[] = [
    {
      field: 'name',
      headerName: t('name'),
      flex: 1,      
      valueGetter: (params) => (params?.row?.menuLangs?.find((s:any) => s.systemLanguageId === 1)?.name) || '',
    },
    {
      field: 'code',
      headerName: t('code'),
      flex: 1 
    },
    {
      field: 'priority',
      headerName: t('priority'),
      flex: 1 
    },
    {
      field: 'description',
      headerName: t('definitionDescription'),
      flex: 1,      
    },
    {
      field: 'isActive',
      headerName: t('isActive'),
      flex: 1,
      valueGetter: (params) => (params?.row?.isActive ? t('yes') : t('no')),   
    },
  ];

  const filterGeneratorList = useMemo(() : IFormGenerator[] => [
    {
      input: FormInputEnum.Text,
      name: 'name',
      title: t('name'),
      placeholder: t('enterName'),
      defaultValue: spec?.name?.replace(/\+/g, ' ')
    },
    {
      input: FormInputEnum.Text,
      name: 'code',
      title: t('code'),
      placeholder: t('enterCode'),
      defaultValue: spec?.code?.replace(/\+/g, ' '),
      textFieldProps: { inputProps: { style: { textTransform: 'uppercase' } } }
    },
    {
      input: FormInputEnum.Text,
      name: 'description',
      title: t('definitionDescription'),
      placeholder: t('enterDefinitionDescription'),
      defaultValue: spec?.description?.replace(/\+/g, ' ')
    },   
    {
      input: FormInputEnum.Radio,
      name: 'getIsActivesToo',
      title: t('isActive'),
      defaultValue: spec?.getIsActivesToo,
      radioList: [
        {
          label: t('yes'),
          value: 'false'
        },
        {
          label: t('no'),
          value: 'true'
        },
      ]
    },
  ], [spec, t]);

  const filterData = useCallback((list?: any[], spec?: any) => {
  
    let newList = [...(list || [])];

    for (const key in spec) {

      if (Object.prototype.hasOwnProperty.call(spec, key)) {

        const element = spec[key];

        if (key === 'name') {

          newList = newList?.filter((a) => a?.menuLangs?.find((s:any) => s.systemLanguageId === 1)?.name?.includes(element));
        
        } else if (key === 'description') {

          newList = newList?.filter((a) => a?.description?.includes(element));
        
        } else if (key === 'code') {

          newList = newList?.filter((a) => a?.code?.includes(element));
        
        }
        
      }
    
    }

    return newList;
  
  }, []);

  const getLabelForDeleteDrawer = (data:any) => data?.menuLangs?.find((s:any) => s.systemLanguageId === 1)?.name || '';

  const onDelete = useCallback(() => {

    if (data?.id) {

      dispatch;

      //   deleteMenuAPI(data?.id)
      //     .then(() => {

      //       dispatch(refreshTable(getAllMenusAPI));
        
      //     });
      
    } 
  
  }, [data?.id, dispatch]);  
      
  return (
    <Layout>

      <ManagedTable 
        columns={columns}
        // fetchData={getAllMenusAPI} 
        // DrawerComponent={MenuDrawer}
        filterData={filterData}
        toolBar={{
          filterGeneratorList,
          title: t('routes.menu'),
        //   defaultButtons: { add: { hide: () => !checkAuthority(Permissions.MenuAdd) } } 
        }}
        defaultButtons={{ 
        //   deleteButton: { hide: () => !checkAuthority(Permissions.MenuDelete) },
        //   editButton: { hide: () => !checkAuthority(Permissions.MenuUpdate) },
        }}
        getLabelForDeleteDrawer={getLabelForDeleteDrawer}
        onDelete={onDelete}
        dataGridProps={{
          paginationMode: 'client',
          pagination: true,
          getRowId: (row) => row?.id || row?.dataId 
        }}
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
