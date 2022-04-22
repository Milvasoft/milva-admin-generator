import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState 
} from 'react';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IDrawerState } from '@assets/types/IDrawerState';
import { IManagedTableWithProcess } from '@assets/types/ManagedTableWithProcess';
import CustomDrawer from '@components/drawer/CustomDrawer';
import DeleteDrawer from './DeleteDrawer';

const TableDrawer = forwardRef(({ DrawerComponent, }:IManagedTableWithProcess, ref) => {

  const [drawer, setDrawer] = useState<IDrawerState>();

  useImperativeHandle(
    ref,
    () => ({
        
      setDrawer(drawer:IDrawerState) {

        setDrawer(drawer);
      
      },
    
    }),
  );

  const handleClose = useCallback(() => setDrawer({ open: false, component: DrawerEnum.Any }), []);

  const DrawerContent = useMemo(() => (
    drawer?.component === DrawerEnum.Delete
      ? (<DeleteDrawer handleCLose={handleClose} />)
      : <DrawerComponent data={drawer?.data} drawerEnum={drawer?.component} handleClose={handleClose} />
  ), [DrawerComponent, drawer, handleClose]);

  return (
    <CustomDrawer open={drawer?.open} onClose={handleClose} PaperProps={{ sx: { width: ['100%', 540], p: [1, 5] } }}>
      {DrawerContent}          
    </CustomDrawer>    
  );

});

export default TableDrawer;
