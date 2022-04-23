import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { Result as ApiResult } from '@utils/network/networkParams';
import { IBaseTableToolBar } from './IBaseTableToolBar';

export interface IAutoTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fetchData: () => Promise<ApiResult<any[]>>,
    toolBar?: IBaseTableToolBar,
}
