import { DrawerEnum } from '@assets/enums/DrawerEnum';
import React from 'react';

export interface IManagedTableActions{
    icon: React.ReactNode,
    title: string,
    drawerEnum: DrawerEnum,
    isHide?: (rowData: any) => boolean
}
