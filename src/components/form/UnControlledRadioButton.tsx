import {
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup,
} from '@mui/material';
import React, { memo } from 'react';
import OutlinedWrapper from './OutlinedWrapper';
  
  type params = {
    data: Array<{
      label?: string,
      value?: any
    }>,
    register?: any,
    title?: string,
    name: string
  }
  
export default memo(function UnControlledRadioButton({
  data,
  register,
  title,
  name 
}: params) {
  
  return (
    <OutlinedWrapper label={title}> 
      <FormControl fullWidth>    
        <RadioGroup row sx={{ alignSelf: 'flex-start', }} {...register(name)}>
          {data.map((element) => (
            <FormControlLabel
              key={element?.label} 
              label={element?.label} 
              value={element?.value} 
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </OutlinedWrapper> 
  );
  
});
  