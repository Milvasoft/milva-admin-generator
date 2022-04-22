import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { IDataInfo } from '@assets/types/IDataInfo';
import { IPaginationDTO } from '@assets/types/IPaginationDTO';
import { Result as ApiResult } from '@utils/network/networkParams';
import { ICustomTableToolBar } from './ICustomTableToolBar';

export interface IManagedTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fetchData: (data:IDataInfo<any>) => Promise<ApiResult<IPaginationDTO<any>>>,
    toolBar?: ICustomTableToolBar,
}
