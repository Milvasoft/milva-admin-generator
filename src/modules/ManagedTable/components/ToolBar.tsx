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
  styled 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';
import { IBaseTableToolBar } from '@assets/types/IBaseTableToolBar';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomDrawer from '@components/drawer/CustomDrawer';
import DrawerHeader from '@components/drawer/DrawerHeader';
import FormGenerator from '@components/form/FormGenerator';

const CustomChip = styled(Chip)(() => ({
  fontSize: '0.8125rem', 
  lineHeight: '1.5', 
  letterSpacing: 0, 
  fontWeight: 400,
  color: 'white'
}));

export default function ToolBar({
  defaultButtons, 
  buttons, 
  data,
  openDrawer,
  filterGeneratorList
}:IBaseTableToolBar) {

  const { t } = useTranslation();

  const [filterDrawer, setFilterDrawer] = useState(false);

  const openFilterDrawer = useCallback(() => setFilterDrawer(true), []);

  const closeFilterDrawer = useCallback(() => setFilterDrawer(false), []);
  
  const handleChipDelete = useCallback(() => {
  
    console.log('functionName');
  
  }, []);
  
  const onSubmit = useCallback((form: any) => {
  
    console.log('onSubmit', form);
  
  }, []);  
  
  return (
    <>

      <GridToolbarContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>  

          <Box>

            <Button startIcon={<FilterListIcon color="primary" />} onClick={openFilterDrawer}>
              {t('filter')}
            </Button>

            <Button startIcon={<AddIcon color="primary" />} onClick={() => openDrawer?.(DrawerEnum.Add)} sx={{ ml: 1 }}>
              {defaultButtons?.add.title || (t('add') || 'Ekle')}
            </Button>

            {
              buttons?.map((item) => (
                <Button
                  key={item.title} 
                  sx={{ ml: 1 }}
                  startIcon={item?.icon || undefined}
                  disabled={item?.disabled?.(data)}
                  onClick={() => openDrawer?.(item.drawerEnum)}
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

      <Box sx={{ display: 'flex', py: 1 }}>
        <CustomChip
          label="small"
          onClick={handleChipDelete}
          deleteIcon={<ClearIcon sx={{ color: '#fff !important' }} />} 
          onDelete={handleChipDelete}           
          color="primary" 
          size="small"
        />
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
  );

}
  
