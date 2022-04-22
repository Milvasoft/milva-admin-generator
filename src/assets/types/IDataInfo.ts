export interface IDataInfo<T = any> {
  pageIndex?: number;
  requestedItemCount?: number;
  orderByProperty?: string;
  orderByAscending?: boolean;
  totalDataCount?: number;
  pageCount?: number;
  spec?: T;
}
