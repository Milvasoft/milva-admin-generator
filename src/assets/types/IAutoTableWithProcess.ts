import React from 'react';
import { IAutoTable } from './IAutoTable';
import { IDrawerComponent } from './IDrawerComponent';
import { IManagedTableActions } from './IManagedTableActions';
import { IManagedTableDefaultButtons } from './IManagedTableDefaultButtons';

export interface IAutoTableWithProcess extends IAutoTable{
    DrawerComponent: React.FunctionComponent<IDrawerComponent>,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons,
    onRefreshTable?: () => void,
    onDelete?: (handleClose:() => void, onRefreshTable?:() => void, data?: any) => void,
    getLabelForDeleteDrawer?: (data?:any) => string,
}

