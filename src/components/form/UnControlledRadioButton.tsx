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
    name: string,
    defaultValue?: any
  }
  
export default memo(function UnControlledRadioButton({
  data,
  register,
  title,
  name,
  defaultValue
}: params) {
  
  return (
    <OutlinedWrapper label={title}> 
      <FormControl fullWidth>    
        <RadioGroup
          row 
          sx={{ alignSelf: 'flex-start', }} 
          defaultValue={defaultValue}
          {...register(name)}
        >
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
  
