import React from 'react';
import { IDrawerComponent } from './IDrawerComponent';
import { IManagedTable } from './IManagedTable';

export interface IManagedTableWithProcess extends IManagedTable{
    DrawerComponent: React.FunctionComponent<IDrawerComponent>
}
