import React from 'react';
import { IDrawerComponent } from './IDrawerComponent';
import { IManagedTable } from './IManagedTable';
import { IManagedTableActions } from './IManagedTableActions';
import { IManagedTableDefaultButtons } from './IManagedTableDefaultButtons';

export interface IManagedTableWithProcess extends IManagedTable{
    DrawerComponent: React.FunctionComponent<IDrawerComponent>,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons,
    onRefreshTable: () => void,
}

