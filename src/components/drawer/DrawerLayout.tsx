import React from 'react';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';

type props = {
    handleConfirm?: () => void,
    handleCancel?: () => void,
    title?: string,
    children: any
}
  
export default function DrawerLayout({
  handleConfirm, 
  handleCancel,
  title, 
  children 
}: props) {

  return (
    <>

      <DrawerHeader title={title} handleCancel={handleCancel} />

      {children}

      <DrawerFooter handleCancel={handleCancel} handleConfirm={handleConfirm} />

    </>
  );

}
