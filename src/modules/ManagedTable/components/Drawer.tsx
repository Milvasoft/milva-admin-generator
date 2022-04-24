import React, { useCallback, useMemo, } from 'react';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import CustomDrawer from '@components/drawer/CustomDrawer';
import { useAppDispatch, useAppSelector } from '@utils/store';
import DeleteDrawer from './DeleteDrawer';
import { closeTableDrawer } from '../redux/slice';
import { IManagedTableToolBarButtons } from '../types/IManagedTableToolBar';
import { IManagedTableActions } from '../types/IManagedTableActions';
  
type props ={
    DrawerComponent: React.FunctionComponent<any>,
    onDelete?: () => void,
    getLabelForDeleteDrawer?: (data?:any) => string,
    buttons?: IManagedTableToolBarButtons[],
    actions?: IManagedTableActions[],
}
  
export default function Drawer({ 
  DrawerComponent,
  onDelete,
  getLabelForDeleteDrawer,
  buttons,
  actions
}:props) {
  
  const drawer = useAppSelector((s) => s.managedTable?.drawer);
  
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(closeTableDrawer()), [dispatch]); 

  const drawerEnumList = useMemo(() => [DrawerEnum.Add, DrawerEnum.Edit, buttons?.map((s) => s.drawerEnum), actions?.map((s) => s.drawerEnum)], [actions, buttons]);

  const isDrawer = useMemo(() => drawerEnumList.findIndex((s) => s === drawer.component), [drawer.component, drawerEnumList]);

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
  
      { drawer?.component === DrawerEnum.Delete && (<DeleteDrawer onDelete={onDelete} getLabelForDeleteDrawer={getLabelForDeleteDrawer} />)}
          
      {isDrawer !== -1 && <DrawerComponent />}
  
    </CustomDrawer>    
  );
  
}
  
