import { DrawerEnum } from '@assets/enums/DrawerEnum';
import React from 'react';

export interface IBaseTableToolBarButtons{
    icon: React.ReactNode,
    title: string,
    drawerEnum: DrawerEnum,
    isHide?: boolean,
    disabled?: (data?: any[]) => boolean
}
