import React from 'react';
import { IAutoTable } from './IAutoTable';
import { IDrawerComponent } from './IDrawerComponent';
import { IManagedTableActions } from './IManagedTableActions';
import { IManagedTableDefaultButtons } from './IManagedTableDefaultButtons';

export interface IManagedTableWithProcess extends IAutoTable{
    DrawerComponent: React.FunctionComponent<IDrawerComponent>,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons
}

