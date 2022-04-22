import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { ICustomTableToolBarButtons } from './ICustomTableToolBarButtons';
import { ICustomTableToolBarDefaultButtons } from './ICustomTableToolBarDefaultButtons';

export interface ICustomTableToolBar{   
    data?: any;
    title?: string,
    buttons?: ICustomTableToolBarButtons[],
    defaultButtons?: ICustomTableToolBarDefaultButtons,
    openDrawer?:(drawerEnum: DrawerEnum) => void
}
