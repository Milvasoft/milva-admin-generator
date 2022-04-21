/* eslint-disable react/jsx-key */
import {
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  FormGroup,
} from '@mui/material';
import React, { memo } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import OutlinedWrapper from './OutlinedWrapper';

type params = {
  data: Array<{
    label?: string,
    name?: string,
    defaultChecked?: boolean
  }>,
  register?: any,
  title?: string,
}

export default memo(function UnControlledCheckBox({ data, register, title }: params) {

  return (
    <OutlinedWrapper label={title}> 
      <FormControl fullWidth>    
        <FormGroup row sx={{ alignSelf: 'flex-start', }}>
          {React.Children.toArray(data.map(
            (element) => (
              <FormControlLabel
                label={element.label}
                control={(
                  <Checkbox              
                    {...register(element?.name)}
                    defaultChecked={element.defaultChecked}
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                  />
                )}
              />
            )
          ))}
        </FormGroup>
      </FormControl>
    </OutlinedWrapper>
  );

});
