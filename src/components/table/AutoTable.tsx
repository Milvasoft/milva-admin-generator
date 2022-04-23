import { IAutoTable } from '@assets/types/IAutoTable';
import React, { useCallback, useEffect, useState } from 'react';
import CustomTable from './CustomTable';

export default function AutoTable({ columns, fetchData, toolBar }:IAutoTable) {

  const [data, setData] = useState<any[]>();

  const [loading, setLoading] = useState(true);

  const getInitialData = useCallback(() => {

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

    getInitialData();
    
  }, [getInitialData]);
    
  return (
    <CustomTable 
      columns={columns}
      rows={data || []}
      loading={loading}      
      toolBar={toolBar}
    />
  );

}
