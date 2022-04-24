import { DrawerEnum } from '@assets/enums/DrawerEnum';

export interface IManagedTableActions {
    icon: React.ReactNode,
    title: string,
    drawerEnum: DrawerEnum,
    isHide?: (rowData: any) => boolean
}
