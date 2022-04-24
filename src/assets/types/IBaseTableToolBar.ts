import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IBaseTableToolBarButtons } from './IBaseTableToolBarButtons';
import { IBaseTableToolBarDefaultButtons } from './IBaseTableToolBarDefaultButtons';
import { IFormGenerator } from './IFormGenerator';

export interface IBaseTableToolBar{   
    data?: any;
    title?: string,
    buttons?: IBaseTableToolBarButtons[],
    defaultButtons?: IBaseTableToolBarDefaultButtons,
    openDrawer?:(drawerEnum: DrawerEnum) => void,
    filterGeneratorList?: IFormGenerator[],
    filters?: any
    
}
