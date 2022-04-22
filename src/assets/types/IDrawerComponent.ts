import { DrawerEnum } from '@assets/enums/DrawerEnum';

export interface IDrawerComponent {
    handleClose: () => void,
    drawerEnum?: DrawerEnum,
    data?: any
}
