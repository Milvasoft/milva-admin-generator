import React, { useCallback, } from 'react';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import CustomDrawer from '@components/drawer/CustomDrawer';
import { useAppDispatch, useAppSelector } from '@utils/store';
import DeleteDrawer from './DeleteDrawer';
import { closeTableDrawer } from '../redux/slice';
  
  type props ={
    DrawerComponent: React.FunctionComponent<any>,
    onDelete?: () => void,
    getLabelForDeleteDrawer?: (data?:any) => string,
  }
  
export default function Drawer({ DrawerComponent, onDelete, getLabelForDeleteDrawer }:props) {
  
  const drawer = useAppSelector((s) => s.managedTable?.drawer);
  
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(closeTableDrawer()), [dispatch]); 

  return (
    <CustomDrawer
      open={drawer?.open}
      onClose={handleClose} 
      PaperProps={{
        sx: {
          width: ['100%', 540],
          px: [2, 5],
          pt: 2,
          pb: 5
        } 
      }}
    >
  
      { drawer?.component === DrawerEnum.Delete
        ? (
          <DeleteDrawer onDelete={onDelete} getLabelForDeleteDrawer={getLabelForDeleteDrawer} />
        )
        : (<DrawerComponent />)}      
  
    </CustomDrawer>    
  );
  
}
  
