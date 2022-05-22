import { DataGridProps, GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import CancelablePromise from '@utils/CancelablePromise';
import { Result as ApiResult } from '@utils/network/networkParams';
import { IDataInfo } from '@src/modules/App/types/IDataInfo';
import { IPaginationDTO } from '@src/modules/App/types/IPaginationDTO';
import { SxProps } from '@mui/material';
import { IManagedTableDefaultButtons } from './IManagedTableDefaultButtons';
import { IManagedTableActions } from './IManagedTableActions';
import { IManagedTableToolBar } from './IManagedTableToolBar';


export interface IManagedTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fetchPaginationData?: (data:IDataInfo<any>) => CancelablePromise<ApiResult<IPaginationDTO<any>>>,
    fetchData?: (getIsActiveFalse?: boolean) => CancelablePromise<ApiResult<any[]>>,
    toolBar?: IManagedTableToolBar,
    DrawerComponent?: React.FunctionComponent<any>,
    actions?: IManagedTableActions[],
    defaultButtons?: IManagedTableDefaultButtons,
    onDelete?: () => void,
    getLabelForDeleteDrawer?: (data?:any) => string,         
    dataGridProps?: Omit<DataGridProps, 'columns' | 'rows'>,
    filterData?: (data?:any[], spec?: any) => any[],
    drawerPaperSx?: SxProps
}

