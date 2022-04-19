import React, { useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
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

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', }}>

      <CssBaseline />

      <LayoutAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      <Drawer variant="permanent" open={open}>

        <Toolbar />

        <Box sx={{ mt: 1, p: 1 }}>

          <Accordion elevation={0} defaultExpanded>

            <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>

              <Typography color="primary">Users</Typography>

            </AccordionSummary>

            <AccordionDetails>

              <List>

                <CustomListItem selected>

                  <ListItemIcon>
                    <GroupsOutlinedIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Users" />

                </CustomListItem>

                <CustomListItem>

                  <ListItemIcon>
                    <PersonAddAltIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Add User" />

                </CustomListItem>

              </List>
              
            </AccordionDetails>

          </Accordion>

          <Accordion elevation={0} sx={{ '&::before': { backgroundColor: 'transparent', } }}>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography>Products</Typography>

            </AccordionSummary>

            <AccordionDetails>

              <List>

                <CustomListItem selected>

                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Products" />

                </CustomListItem>

                <CustomListItem>

                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText primary="Add Product" />

                </CustomListItem>

              </List>
  
            </AccordionDetails>

          </Accordion>

        </Box>
          
      </Drawer>

      <Main open={open}>

        {children}

      </Main>

    </Box>
  );

}
