import React, {
  forwardRef,
  useCallback, 
  useEffect,
  useImperativeHandle,
  useState 
} from 'react';
import { IAutoTable } from '@assets/types/IAutoTable';
import BaseTable from './BaseTable';

const AutoTable = forwardRef(({ columns, fetchData, toolBar }:IAutoTable, ref) => {

  const [data, setData] = useState<any[]>();

  const [loading, setLoading] = useState(true);

  const getData = useCallback(() => {

    setLoading(true);

    fetchData()
      .then((res) => {

        setData(res?.result || {});

        setLoading(false);
  
      })
      .catch(() => {

        setLoading(false);
  
      });
  
  }, [fetchData]);
  
  useEffect(() => {

    getData();
    
  }, [getData]);

  useImperativeHandle(
    ref,
    () => ({
        
      onRefresh() {

        getData();
      
      },
    
    }),
  );

  return (
    <BaseTable 
      columns={columns}
      rows={data || []}
      loading={loading}      
      toolBar={toolBar}
    />
  );

});

export default AutoTable;
