import { DrawerEnum } from '@assets/enums/DrawerEnum';

export interface IDrawerState {
    open: boolean,
    component: DrawerEnum,
    data?: any
}
