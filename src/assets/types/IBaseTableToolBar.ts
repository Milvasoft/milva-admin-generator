import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IBaseTableToolBarButtons } from './IBaseTableToolBarButtons';
import { IBaseTableToolBarDefaultButtons } from './IBaseTableToolBarDefaultButtons';

export interface IBaseTableToolBar{   
    data?: any;
    title?: string,
    buttons?: IBaseTableToolBarButtons[],
    defaultButtons?: IBaseTableToolBarDefaultButtons,
    openDrawer?:(drawerEnum: DrawerEnum) => void
}
