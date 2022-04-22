import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';

interface ICustomDrawer extends DrawerProps{
    children: any
}
export default function CustomDrawer({ children, ...props }:ICustomDrawer) {

  return (
    <Drawer {...props} anchor="right" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
      {children}
    </Drawer>
  );

}
