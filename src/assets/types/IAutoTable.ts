import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { Result as ApiResult } from '@utils/network/networkParams';
import { ICustomTableToolBar } from './ICustomTableToolBar';

export interface IAutoTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fetchData: () => Promise<ApiResult<any[]>>,
    toolBar?: ICustomTableToolBar,
}
