import { AnyAaaaRecord } from 'dns';
import React from 'react';
import DrawerHeader from './DrawerHeader';

type props = {
    handleCancel?: () => void,
    title?: string,
    children: any,
    drawerInfo?: AnyAaaaRecord
}
  
export default function DrawerLayout({
  handleCancel,
  title, 
  children,
  drawerInfo
}: props) {

  return (
    <>

      <DrawerHeader title={title} handleCancel={handleCancel} drawerInfo={drawerInfo} />

      {children}

    </>
  );

}
