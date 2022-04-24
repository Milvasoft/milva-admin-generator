/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Hidden, Toolbar } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CookieService } from '@helpers/cookieService';
import { CookieEnum } from '@assets/enums/CookieEnum';
import { useTranslation } from 'next-i18next';
import DrawerHeader from '@components/drawer/DrawerHeader';
import { pages } from '@utils/Routes';
import LayoutAppBar from './LayoutAppBar';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  borderRight: 'none',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box', 
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const CustomListItem = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({ 
  borderRadius: theme.spacing(1),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean;}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2, 3),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(10),
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.layoutMainBg, 
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '88vh',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),  
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
        
export default function Layout({ children }: any) {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const path = router.asPath;

  const handleDrawerOpen = () => {

    CookieService.setCookie(CookieEnum.LayoutDrawer, 'true');

    setOpen(true);

  };

  const handleDrawerClose = () => {

    CookieService.setCookie(CookieEnum.LayoutDrawer, 'false');

    setOpen(false);

  };

  useEffect(() => {
    
    setOpen(!!CookieService.getCookie(CookieEnum.LayoutDrawer));
   
  }, []);
  
  return (
    <Box sx={{ display: 'flex', }}>

      <CssBaseline />

      <LayoutAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <MuiDrawer
        open={open} 
        anchor="left" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 2, 
          display: ['block !important', 'block !important', 'none !important', 'none !important'], 
        }}
        PaperProps={{ 
          sx: {
            width: ['100%', 240], 
            backgroundImage: 'none !important'
          } 
        }}
        onClose={handleDrawerClose}
      >

        <Box sx={{ mt: 1, p: 1 }}>

          <DrawerHeader title={t('pages')} handleCancel={handleDrawerClose} />
        
          {
            pages?.map((item) => (
              <Accordion
                elevation={0} 
                defaultExpanded={item?.children?.some((s) => s.href === path)}
                sx={{ '&::before': { backgroundColor: 'transparent', } }}
                key={item.titleKey}
              >

                <AccordionSummary expandIcon={<ExpandMoreIcon color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined} />}>

                  <Typography color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined}>{t(item?.titleKey)}</Typography>

                </AccordionSummary>

                <AccordionDetails>

                  <List>

                    {
                      item?.children?.map((child) => (
                        <NextLink href={child.href} key={child.href}>           
                          <CustomListItem selected={child.href === path}>

                            <ListItemIcon>
                              {child.icon}
                            </ListItemIcon>

                            <ListItemText primary={t(child.titleKey)} />

                          </CustomListItem>
                        </NextLink>
                      ))
                    }

                  </List>
        
                </AccordionDetails>

              </Accordion>
            ))
          }


        </Box>
        
      </MuiDrawer>
      
      {/* @ts-ignore */}
      <Hidden mdDown>
        <Drawer variant="permanent" open={open}>

          <Toolbar />

          <Box sx={{ mt: 1, p: 1 }}>

            {
              pages?.map((item) => (
                <Accordion
                  elevation={0} 
                  defaultExpanded={item?.children?.some((s) => s.href === path)}
                  sx={{ '&::before': { backgroundColor: 'transparent', } }}
                  key={item.titleKey}
                >

                  <AccordionSummary expandIcon={<ExpandMoreIcon color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined} />}>
  
                    <Typography color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined}>{t(item?.titleKey)}</Typography>
  
                  </AccordionSummary>
  
                  <AccordionDetails>
  
                    <List>

                      {
                        item?.children?.map((child) => (
                          <NextLink href={child.href} key={child.href}>           
                            <CustomListItem selected={child.href === path}>
    
                              <ListItemIcon>
                                {child.icon}
                              </ListItemIcon>
    
                              <ListItemText primary={t(child.titleKey)} />
    
                            </CustomListItem>
                          </NextLink>
                        ))
                      }
  
                    </List>
                
                  </AccordionDetails>
  
                </Accordion>
              ))
            }


          </Box>
          
        </Drawer>
      </Hidden>

      <Main open={open}>

        {children}

      </Main>

    </Box>
  );

}
