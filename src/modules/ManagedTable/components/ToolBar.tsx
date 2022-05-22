/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useState } from 'react';
import { 
  GridToolbarContainer,
  GridToolbarExport, 
  GridToolbarDensitySelector, 
} from '@mui/x-data-grid';
import {
  Box, 
  Button,
  Chip, 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomDrawer from '@components/drawer/CustomDrawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import FormGenerator from '@components/form/FormGenerator';
import { useAppDispatch, useAppSelector } from '@utils/store';
import { useRouter } from 'next/router';
import clearEmptyKeys from '@helpers/clearEmptyKeys';
import { IDrawerState } from '@src/modules/App/types/IDrawerState';
import { styled, } from '@mui/material/styles';
import { FormInputEnum } from '@assets/enums/FormInputEnum';
import moment from 'moment';
import { IManagedTableToolBar } from '../types/IManagedTableToolBar';
import { openTableDrawer } from '../redux/slice';

const CustomChip = styled(Chip)(() => ({
  fontSize: '0.8125rem', 
  lineHeight: '1.5', 
  letterSpacing: 0, 
  fontWeight: 400,
  color: 'white',
  marginLeft: 8
}));

export default function ToolBar({
  defaultButtons, 
  buttons, 
  filterGeneratorList
}:IManagedTableToolBar) {

  const data = useAppSelector((s) => s?.managedTable?.data);

  const dataInfo = useAppSelector((s) => s?.managedTable?.dataInfo);

  const { t } = useTranslation();

  const router = useRouter();

  const dispatch = useAppDispatch(); 

  const [filterDrawer, setFilterDrawer] = useState(false);

  const openFilterDrawer = useCallback(() => setFilterDrawer(true), []);

  const closeFilterDrawer = useCallback(() => setFilterDrawer(false), []);

  const openDrawer = useCallback((param: IDrawerState) => dispatch(openTableDrawer(param)), [dispatch]);
  
  const handleChipDelete = useCallback((propertyName : string) => {
  
    try {

      const newFilters = { ...dataInfo };

      const newSpec = { ...newFilters.spec };

      delete newSpec[propertyName];

      newFilters.spec = { ...newSpec };

      router.push(router.route, {
        query: {
          requestedItemCount: dataInfo?.requestedItemCount || 10,
          pageIndex: 1,
          spec: JSON.stringify(clearEmptyKeys(newFilters?.spec)) 
        },
      });

    } catch (e) {
      
      router.push(router.route, {
        query: {
          requestedItemCount: dataInfo?.requestedItemCount || 10,
          pageIndex: 1,
          spec: JSON.stringify(clearEmptyKeys(dataInfo?.spec)) 
        },
      });
    
    }
  
  }, [dataInfo, router]);
  
  const onSubmit = useCallback((form: any) => {
      
    if (Object.entries(form).length !== 0) {

      router.push(router.route, {
        query: {
          requestedItemCount: dataInfo?.requestedItemCount || 10,
          pageIndex: 1,
          spec: JSON.stringify(clearEmptyKeys(form)) 
        },
      });

    }
    
  }, [dataInfo?.requestedItemCount, router]);  

  const getFilterLabel = useCallback((key: string) => {

    const formItem = filterGeneratorList?.find((s) => s.name === key);

    switch (formItem?.input) {

      case FormInputEnum.Text:
        return `${formItem?.title}: ${dataInfo?.spec?.[key]?.replace(/\+/g, ' ')}`;

      case FormInputEnum.Number:
        return `${formItem?.title}: ${dataInfo?.spec?.[key]?.replace(/\+/g, ' ')}`;
        
      case FormInputEnum.PhoneNumber:
        return `${formItem?.title}: ${dataInfo?.spec?.[key]?.replace(/\+/g, ' ')}`;

      case FormInputEnum.DateTime:
        return `${formItem?.title}: ${moment(dataInfo?.spec?.[key]).format('LLL')}`;
        
      case FormInputEnum.AutoSelect:
        return `${formItem?.title}: ${dataInfo?.spec?.[key]?.title?.replace(/\+/g, ' ')}`;

      case FormInputEnum.Radio: {

        const defaultValue = dataInfo?.spec?.[key]?.toString();

        const value = formItem.radioList?.find((s) => s.value?.toString() === defaultValue)?.label || '';

        return `${formItem?.title}: ${value}`;

      }

      case FormInputEnum.Select: {

        const defaultValue = dataInfo?.spec?.[key]?.toString();

        const value = formItem.selectList?.find((s) => s.value?.toString() === defaultValue)?.label || '';

        return `${formItem?.title}: ${value}`;

      }
    
      default:
        return '';
    }
  
  }, [dataInfo?.spec, filterGeneratorList]);
  
  return (
    <>

      <GridToolbarContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>  

          <Box sx={{ mt: 1 }}>

            { (filterGeneratorList && filterGeneratorList?.length > 0) && (
              <Button 
                startIcon={<FilterListIcon />}
                onClick={openFilterDrawer} 
                variant="contained" 
                size="small"
                disableElevation
              >
                {t('filter')}
              </Button>
            )}

            {!defaultButtons?.add?.hide?.(data?.dtoList)
            && (
              <Button
                startIcon={<AddIcon />} 
                onClick={() => (defaultButtons?.add.click ? defaultButtons?.add.click() : openDrawer?.({ component: DrawerEnum.Add }))} 
                sx={{ ml: (filterGeneratorList && filterGeneratorList?.length > 0) ? 1 : 0 }}
                size="small"
                variant="contained"
                disableElevation
              >
                {defaultButtons?.add?.title || (t('add') || 'Ekle')}
              </Button>
            )}

            {
              buttons?.map((item) => (
                <Button
                  key={item.title} 
                  sx={{ ml: 1 }}
                  startIcon={item?.icon || undefined}
                  disabled={item?.disabled?.(data?.dtoList)}
                  onClick={() => openDrawer?.({ component: item.drawerEnum })}
                >
                  {item.title}
                </Button>
              ))
            }

          </Box>

          <Box>
          
            <GridToolbarDensitySelector />

            <GridToolbarExport />

          </Box>
     
        </Box>

      </GridToolbarContainer>

      {
        (filterGeneratorList && filterGeneratorList?.length > 0) && (
          <>  
          
            <Box sx={{ display: 'flex', py: 1, pt: 2 }}>

              {
                dataInfo?.spec ? Object.keys(dataInfo?.spec)?.map((key) => (
                  <CustomChip
                    key={key}
                    label={getFilterLabel(key)}
                    onClick={() => handleChipDelete(key)}
                    onDelete={() => handleChipDelete(key)}
                    deleteIcon={<ClearIcon sx={{ color: '#fff !important' }} />} 
                    color="secondary" 
                    // size="small"
                  />
                ))
                  : null
              }              

            </Box>

            <CustomDrawer 
              open={filterDrawer}
              onClose={closeFilterDrawer} 
              PaperProps={{
                sx: {
                  width: ['100%', 540],
                  px: [2, 5],
                  pt: 2,
                  pb: 5
                } 
              }}
            >

              <DrawerHeader handleCancel={closeFilterDrawer} title={t('filter')} />
        
              <FormGenerator 
              // @ts-ignore
                formList={filterGeneratorList} 
                onSubmit={onSubmit}
                handleCancel={closeFilterDrawer}
                sx={{ mt: 2 }}
              />
              
            </CustomDrawer> 
          </>
        )
      }

    </>
  );

}
  
