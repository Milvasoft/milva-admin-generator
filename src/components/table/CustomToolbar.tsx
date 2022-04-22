import * as React from 'react';
import { GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';
import { ICustomTableToolBar } from '@assets/types/ICustomTableToolBar';
import { DrawerEnum } from '@assets/enums/DrawerEnum';

export default function CustomToolbar({
  defaultButtons, 
  buttons, 
  data,
  openDrawer 
}:ICustomTableToolBar) {

  const { t } = useTranslation();

  return (
    <GridToolbarContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          py: 1 
        }}
      >  

        <Box>

          <Button startIcon={<AddIcon color="primary" />} onClick={() => openDrawer?.(DrawerEnum.Add)}>
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
  );

}
  
