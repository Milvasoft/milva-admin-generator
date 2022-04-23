import { DrawerEnum } from '@assets/enums/DrawerEnum';

export interface IDrawerComponent {
    handleClose: () => void,
    onRefreshTable?: () => void,
    drawerEnum?: DrawerEnum,
    data?: any
}
