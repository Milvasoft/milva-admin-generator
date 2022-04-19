export interface IManagedTableData<TData = any, TSpec = any> {
    pageIndex?: number;
    requestedItemCount?: number;
    orderByProperty?: string;
    orderByAscending?: boolean;
    totalDataCount?: number;
    pageCount?: number;
    dtoList: Array<TData>;
    spec?: TSpec;
  }
  
