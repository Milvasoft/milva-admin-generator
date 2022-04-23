import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState 
} from 'react';
import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IDrawerState } from '@assets/types/IDrawerState';
import CustomDrawer from '@components/drawer/CustomDrawer';
import { IDrawerComponent } from '@assets/types/IDrawerComponent';
import DeleteDrawer from './DeleteDrawer';

type props ={
  DrawerComponent: React.FunctionComponent<IDrawerComponent>,
  onRefreshTable?: () => void,  
  onDelete?: (handleCLose:() => void, onRefreshTable?:() => void, data?: any) => void,
  getLabelForDeleteDrawer?: (data?:any) => string,
}

const TableDrawer = forwardRef(({
  DrawerComponent,
  onRefreshTable, 
  onDelete,
  getLabelForDeleteDrawer 
}:props, ref) => {

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
        ? (
          <DeleteDrawer
            handleClose={handleClose}
            handleConfirm={onDelete}
            onRefreshTable={onRefreshTable}
            data={drawer?.data}
            getLabelForDeleteDrawer={getLabelForDeleteDrawer}
          />
        )
        : (
          <DrawerComponent 
            data={drawer?.data}
            drawerEnum={drawer?.component}
            handleClose={handleClose}
            onRefreshTable={onRefreshTable}
          />
        )}      

    </CustomDrawer>    
  );

});

export default TableDrawer;
