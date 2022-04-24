import { IDrawerComponent } from '@assets/types/IDrawerComponent';
import { DataGridProps, GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import CancelablePromise from '@utils/CancelablePromise';
import { Result as ApiResult } from '@utils/network/networkParams';
import { IPaginationDTO } from '@assets/types/IPaginationDTO';
import { IDataInfo } from '@assets/types/IDataInfo';
import { IManagedTableDefaultButtons } from './IManagedTableDefaultButtons';
import { IManagedTableActions } from './IManagedTableActions';
import { IManagedTableToolBar } from './IManagedTableToolBar';


export interface IManagedTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fetchData: (data:IDataInfo<any>) => CancelablePromise<ApiResult<IPaginationDTO<any>>>,
    toolBar?: IManagedTableToolBar,
    DrawerComponent: React.FunctionComponent<IDrawerComponent>,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons,
    onDelete?: () => void,
    getLabelForDeleteDrawer?: (data?:any) => string,         
    dataGridProps?: Omit<DataGridProps, 'columns' | 'rows'>
}

