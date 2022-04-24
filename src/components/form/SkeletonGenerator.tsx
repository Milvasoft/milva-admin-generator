/* eslint-disable react/jsx-key */
import { Skeleton } from '@mui/material';
import React from 'react';

type props = {
    count: number
}

export default function SkeletonGenerator({ count }: props) {

  return (
    <>

      <Skeleton variant="text" sx={{ mt: 2 }} />
        
      { React.Children.toArray((
        [...new Array(count)].map(() => (
          <Skeleton 
            variant="text"
            height={90}
            width="100%"
            sx={{
              mt: 1,
              py: 2,
              px: [1, 1, 3],
            }}
          />
        ))))}

    </>  
  );

}
