import React, { useEffect, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import NextLink from 'next/link';
import { Routes } from '@utils/Routes';
import { useRouter } from 'next/router';
import { CookieService } from '@helpers/cookieService';
import { CookieEnum } from '@assets/enums/CookieEnum';
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
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(10),
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.layoutMainBg, 
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(2),
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

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const path = router.asPath;

  const pages = [
    {
      title: 'Users',
      children: [
        {
          href: Routes.users,
          title: 'Users',
          icon: <GroupsOutlinedIcon fontSize="small" />
        },
        {
          href: Routes.addUser,
          title: 'Add User',
          icon: <PersonAddAltIcon fontSize="small" />
        },
      ]
    },
    {
      title: 'Products',
      children: [
        {
          href: '#',
          title: 'Products',
          icon: <GroupsOutlinedIcon fontSize="small" />
        },
        {
          href: '#',
          title: 'Add Product',
          icon: <PersonAddAltIcon fontSize="small" />
        },
      ]
    },

  ];

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

      <Drawer variant="permanent" open={open}>

        <Toolbar />

        <Box sx={{ mt: 1, p: 1 }}>

          {
            pages?.map((item) => (
              <Accordion
                elevation={0} 
                defaultExpanded={item?.children?.some((s) => s.href === path)}
                sx={{ '&::before': { backgroundColor: 'transparent', } }}
                key={item.title}
              >

                <AccordionSummary expandIcon={<ExpandMoreIcon color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined} />}>
  
                  <Typography color={item?.children?.some((s) => s.href === path) ? 'primary' : undefined}>{item?.title}</Typography>
  
                </AccordionSummary>
  
                <AccordionDetails>
  
                  <List>

                    {
                      item?.children?.map((child) => (
                        <NextLink href={child.href} prefetch={false} key={child.href}>           
                          <CustomListItem selected={child.href === path}>
    
                            <ListItemIcon>
                              {child.icon}
                            </ListItemIcon>
    
                            <ListItemText primary={child.title} />
    
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

      <Main open={open}>

        {children}

      </Main>

    </Box>
  );

}
