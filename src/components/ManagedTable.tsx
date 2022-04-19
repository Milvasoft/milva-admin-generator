import { GridColumns, GridValidRowModel } from '@mui/x-data-grid';
import { IDataInfo } from '@src/modules/app/types/IDataInfo';
import { IManagedTableData } from '@src/modules/app/types/IManagedTableData';
import { IPaginationDTO } from '@src/modules/app/types/IPaginationDTO';
import { Result as ApiResult } from '@utils/network/networkParams';
import React, { useCallback, useEffect, useState } from 'react';
import CustomTable from './CustomTable';

interface IManagedTable<R extends GridValidRowModel = any> {
    columns: GridColumns<R>,
    fecthData: (data:IDataInfo<any>) => Promise<ApiResult<IPaginationDTO<any>>>
}

export default function ManagedTable({ columns, fecthData }:IManagedTable) {

  const [data, setData] = useState<IManagedTableData<any>>();

  const [loading, setLoading] = useState(true);

  const getInitialData = useCallback(() => {
  
    fecthData({ pageIndex: 1, requestedItemCount: 10 })
      .then((res) => {

        setData(res?.result || {});

        setLoading(false);
  
      })
      .catch(() => {

        setLoading(false);
  
      });

  
  }, [fecthData]);
  
  useEffect(() => {

    getInitialData();
    
  }, [getInitialData]);
    
  const getData = useCallback((info:IDataInfo<any>) => {

    setLoading(true);

    fecthData(info)
      .then((res) => {

        setData({ ...data, ...res.result });

        setLoading(false);
    
      })
      .catch(() => {

        setData({ ...data, dtoList: [] });

        setLoading(false);
    
      });
  
  }, [data, fecthData]);

  const onPageChange = useCallback((page: number) => {
  
    getData({ pageIndex: page + 1, requestedItemCount: data?.requestedItemCount });
  
  }, [data?.requestedItemCount, getData]);
  
  const onPageSizeChange = useCallback((pageSize: number,) => {
  
    getData({ pageIndex: data?.pageCount, requestedItemCount: pageSize });
  
  }, [data?.pageCount, getData]);

  return (
    <CustomTable 
      columns={columns}
      rows={data?.dtoList || []}
      loading={loading}      
      rowCount={data?.dtoList?.length || 0} 
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      paginationMode="server"
    />
  );

}
