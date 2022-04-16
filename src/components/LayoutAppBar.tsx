import React, { useState } from 'react';
import { styled, } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Divider,
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '@src/providers/ColorModeContextProvider';
import { useRouter } from 'next/router';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type props = {
 handleDrawerOpen: () => void,
 open: boolean
}

export default function LayoutAppBar({ handleDrawerOpen, open }:props) {

  const { mode, toggleColorMode } = useColorMode();

  const { t } = useTranslation();

  const router = useRouter();

  const [settingDrawer, setSettingDrawer] = useState(false);

  const handleSettingDrawerOpen = () => setSettingDrawer(true);

  const handleSettingDrawerClose = () => setSettingDrawer(false);

  const handleCoorMode = (event: any, newMode: string) => toggleColorMode(newMode);

  const changeLanguage = (e:any, newLocale: string) => router.push(router.asPath, router.asPath, { locale: newLocale });
  
  return (
    <>
   
      <AppBar position="fixed" open={open}>

        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6" 
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            MilvaSoft Admin Template
          </Typography>
            
          <Tooltip title={t('settings')}>
            <ToggleButton value="checked" sx={{ borderRadius: 3, mr: 2 }} onClick={handleSettingDrawerOpen}>
              <SettingsIcon fontSize="small" sx={{ color: 'white' }} />
            </ToggleButton>      
          </Tooltip>

          <Tooltip title={t('logout')}>
            <ToggleButton value="checked" sx={{ borderRadius: 3 }}>
              <LogoutIcon fontSize="small" sx={{ color: 'white' }} />
            </ToggleButton>      
          </Tooltip>

        </Toolbar>

      </AppBar>

      <Drawer
        anchor="right"
        open={settingDrawer}
        onClose={handleSettingDrawerClose}
        sx={{ zIndex: 1252, }}
        PaperProps={{ sx: { width: ['100%', '100%', 360], borderRadius: '10px 0px 0px 10px' }, }}
      >

        <Box
          sx={{
            p: 2, 
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >

          <Typography>
            {t('settings')}
          </Typography>
        
          <IconButton onClick={handleSettingDrawerClose}>

            <CloseIcon />

          </IconButton>

        </Box>

        <Divider />

        <Box sx={{ px: 2, width: '100%', }}>        

          <Typography sx={{ mt: 2.5, mb: 1.25 }}>
            Mode
          </Typography>        
        
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleCoorMode}
            sx={{ width: '100%' }}
          >
            <ToggleButton value="light" sx={{ width: '50%', borderRadius: '10px' }}>

              <LightModeIcon />

              <Typography sx={{ textTransform: 'none', ml: 1 }}>
                Light
              </Typography>

            </ToggleButton>

            <ToggleButton value="dark" sx={{ width: '50%', borderRadius: '10px' }}>

              <DarkModeIcon />

              <Typography sx={{ textTransform: 'none', ml: 1 }}>
                Dark
              </Typography>

            </ToggleButton>

          </ToggleButtonGroup>
        
        </Box>

        <Box sx={{ px: 2, width: '100%', }}>        

          <Typography sx={{ mt: 2.5, mb: 1.25 }}>
            {t('language')}
          </Typography>        
        
          <ToggleButtonGroup
            color="primary"
            value={router.locale}
            exclusive
            onChange={changeLanguage}
            orientation="vertical"
            sx={{ width: '100%' }}
          >

            <ToggleButton value="tr" sx={{ width: '100%', textTransform: 'none', }}>
              {t('languages.turkish')}
            </ToggleButton>

            <ToggleButton value="en" sx={{ width: '100%', textTransform: 'none', }}>
              {t('languages.english')}
            </ToggleButton>

          </ToggleButtonGroup>
        
        </Box>

      </Drawer>

    </>
  );

}
