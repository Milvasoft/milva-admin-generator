import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState 
} from 'react';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IDrawerState } from '@assets/types/IDrawerState';
import CustomDrawer from '@components/drawer/CustomDrawer';
import { IManagedTableWithProcess } from '@assets/types/IManagedTableWithProcess';
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

  const handleClose = useCallback(() => setDrawer({ open: false, component: drawer?.component || DrawerEnum.Any }), [drawer?.component]);

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
        ? (<DeleteDrawer handleCLose={handleClose} />)
        : <DrawerComponent data={drawer?.data} drawerEnum={drawer?.component} handleClose={handleClose} />}      

    </CustomDrawer>    
  );

});

export default TableDrawer;
