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
    setValue?: any,
    title?: string,
    name: string,
    defaultValue?: any
  }
  
export default memo(function UnControlledRadioButton({
  data,
  setValue,
  title,
  name,
  defaultValue

}: params) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(name, (event.target as HTMLInputElement).value);
  
  return (
    <OutlinedWrapper label={title}> 
      <FormControl fullWidth>    
        <RadioGroup
          row 
          sx={{ alignSelf: 'flex-start', }} 
          defaultValue={defaultValue}
          onChange={handleChange}
          name={name}
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
  
