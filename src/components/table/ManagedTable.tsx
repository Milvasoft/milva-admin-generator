import React, {
  forwardRef,
  useCallback,
  useEffect, 
  useImperativeHandle, 
  useState 
} from 'react';
import { IDataInfo } from '@assets/types/IDataInfo';
import { IManagedTable } from '@assets/types/IManagedTable';
import { IManagedTableData } from '@assets/types/IManagedTableData';
import BaseTable from './BaseTable';

const ManagedTable = forwardRef(({ columns, fetchData, toolBar }:IManagedTable, ref) => {
    
  const [data, setData] = useState<IManagedTableData<any>>();
    
  const [dataInfo, setDataInfo] = useState<IDataInfo<any>>({ pageIndex: 1, requestedItemCount: 10 });

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

    setDataInfo(info);

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

  const onRefresh = useCallback(() => getData(dataInfo), [dataInfo, getData]);

  useImperativeHandle(
    ref,
    () => ({
        
      onRefresh() {

        onRefresh();
      
      },
    
    }),
  );

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

});
export default ManagedTable;
