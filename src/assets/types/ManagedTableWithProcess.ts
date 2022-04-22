import React from 'react';
import { IDrawerComponent } from './IDrawerComponent';
import { IManagedTable } from './IManagedTable';

export interface IManagedTableWithProcess extends IManagedTable{
    isDelete?: boolean,
    isEdit?: boolean,
    isAdd?: boolean,
    DrawerComponent: React.FunctionComponent<IDrawerComponent>
}
