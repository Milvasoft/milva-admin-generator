import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IFilterGenerator } from '@assets/types/IFilterGenerator';

export interface IManagedTableToolBar{
    title?: string,
    buttons?: IManagedTableToolBarButtons[],
    defaultButtons?: IManagedTableToolBarDefaultButtons,
    filterGeneratorList?: IFilterGenerator[],
}

export interface IManagedTableToolBarButtons{
    icon: React.ReactNode,
    title: string,
    drawerEnum: DrawerEnum,
    isHide?: boolean,
    disabled?: (data?: any[]) => boolean
}

export interface IManagedTableToolBarDefaultButtons {

    add: {
        title?: string;
        hide?: (data: any[]) =>boolean,
        click?: () =>boolean,
    }
}
