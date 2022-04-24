import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IFilterGenerator } from '@assets/types/IFilterGenerator';

export interface IManagedTableToolBar{
    title?: string,
    buttons?: IBaseTableToolBarButtons[],
    defaultButtons?: IBaseTableToolBarDefaultButtons,
    filterGeneratorList?: IFilterGenerator[],
}

export interface IBaseTableToolBarButtons{
    icon: React.ReactNode,
    title: string,
    drawerEnum: DrawerEnum,
    isHide?: boolean,
    disabled?: (data?: any[]) => boolean
}

export interface IBaseTableToolBarDefaultButtons {

    add: {
        title?: string;
        hide?: (data: any[]) =>boolean,
    }
}
