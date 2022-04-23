import { IDataInfo } from '@assets/types/IDataInfo';
import { IManagedTable } from '@assets/types/IManagedTable';
import { IManagedTableData } from '@assets/types/IManagedTableData';
import React, { useCallback, useEffect, useState } from 'react';
import BaseTable from './BaseTable';

export default function ManagedTable({ columns, fetchData, toolBar }:IManagedTable) {

  const [data, setData] = useState<IManagedTableData<any>>();

  const [loading, setLoading] = useState(true);

  const getInitialData = useCallback(() => {

    fetchData({ pageIndex: 1, requestedItemCount: 10 })
      .then((res) => {

        setData(res?.result || {});

        setLoading(false);
  
      })
      .catch(() => {

        setLoading(false);
  
      });
  
  }, [fetchData]);
  
  useEffect(() => {

    getInitialData();
    
  }, [getInitialData]);
    
  const getData = useCallback((info:IDataInfo<any>) => {

    setLoading(true);

    fetchData(info)
      .then((res) => {

        setData({ ...data, ...res.result });

        setLoading(false);
    
      })
      .catch(() => {

        setData({ ...data, dtoList: [] });

        setLoading(false);
    
      });
  
  }, [data, fetchData]);

  const onPageChange = useCallback((page: number) => {
  
    getData({ pageIndex: page + 1, requestedItemCount: data?.requestedItemCount });
  
  }, [data?.requestedItemCount, getData]);
  
  const onPageSizeChange = useCallback((pageSize: number,) => {
  
    getData({ pageIndex: data?.pageCount, requestedItemCount: pageSize });
  
  }, [data?.pageCount, getData]);

  return (
    <BaseTable 
      columns={columns}
      rows={data?.dtoList || []}
      loading={loading}      
      rowCount={data?.dtoList?.length || 0} 
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      paginationMode="server"
      toolBar={toolBar}
    />
  );

}
