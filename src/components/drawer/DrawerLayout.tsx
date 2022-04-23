import React from 'react';
import DrawerHeader from './DrawerHeader';

type props = {
    handleCancel?: () => void,
    title?: string,
    children: any
}
  
export default function DrawerLayout({
  handleCancel,
  title, 
  children 
}: props) {

  return (
    <>

      <DrawerHeader title={title} handleCancel={handleCancel} />

      {children}

    </>
  );

}
