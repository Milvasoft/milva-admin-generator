import { DrawerEnum } from '@assets/enums/DrawerEnum';
import { IFormGenerator } from '@src/modules/App/types/IFormGenerator';

export interface IManagedTableToolBar{
    title?: string,
    buttons?: IManagedTableToolBarButtons[],
    defaultButtons?: IManagedTableToolBarDefaultButtons,
    filterGeneratorList?: IFormGenerator[],
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
        hide?: (data?: any[]) =>boolean,
        click?: () => void,
    }
}
