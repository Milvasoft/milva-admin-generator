import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';

interface ICustomDrawer extends DrawerProps{
    children: any
}
export default function CustomDrawer({ children, ...props }:ICustomDrawer) {

  return (
    <Drawer {...props}>
      {children}
    </Drawer>
  );

}
