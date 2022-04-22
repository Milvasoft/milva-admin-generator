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
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Link from 'next/link';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none',
  background: theme.palette.layoutAppBar
}));

type props = {
 handleDrawerOpen: () => void,
 handleDrawerClose: () => void,
 open: boolean
}

export default function LayoutAppBar({ handleDrawerOpen, open, handleDrawerClose }:props) {

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
   
      <AppBar position="fixed">

        <Toolbar>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center', 
            }}
          >  

            <Typography
              variant="h6" 
              noWrap
              component="div"
              sx={{ width: '180px' }}
            >
              Admin
            </Typography>
          
            <ToggleButton 
              value="checked" 
              onClick={!open ? handleDrawerOpen : handleDrawerClose}
              sx={{ ml: 2, borderRadius: 2, }}
              size="small"
              color="primary"
            >
              {open ? <MenuOpenIcon color="primary" fontSize="small" /> : <MenuIcon color="primary" fontSize="small" />}
            </ToggleButton>    

          </Box>
            
          <Tooltip title={t('settings')}>
            <ToggleButton
              value="checked" 
              sx={{ borderRadius: 3, mr: 2, }}
              size="small"
              onClick={handleSettingDrawerOpen}
            >
              <SettingsIcon fontSize="small" color="primary" />
            </ToggleButton>      
          </Tooltip>

          <Link passHref href="/" prefetch={false}>
            <Tooltip title={t('logout')}>            
              <ToggleButton 
                value="checked" 
                sx={{ borderRadius: 3, }}
                size="small"
              >
                <LogoutIcon fontSize="small" color="primary" />
              </ToggleButton>  
            </Tooltip>
          </Link>    

        </Toolbar>

      </AppBar>

      <Drawer
        anchor="right"
        open={settingDrawer}
        onClose={handleSettingDrawerClose}
        sx={{ zIndex: 1252, }}
        PaperProps={{ sx: { width: ['100%', 360], borderRadius: '10px 0px 0px 10px' }, }}
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
                {t('light')}
              </Typography>

            </ToggleButton>

            <ToggleButton value="dark" sx={{ width: '50%', borderRadius: '10px' }}>

              <DarkModeIcon />

              <Typography sx={{ textTransform: 'none', ml: 1 }}>
                {t('dark')}
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
