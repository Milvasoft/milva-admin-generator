/* eslint-disable react/jsx-key */
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { memo } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type params = {
  data: Array<{
    label?: string,
    name?: string,
    defaultChecked?: boolean
  }>,
  register?: any
}

export default memo(function UnControlledCheckBox({ data, register }: params) {

  return (
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
  );

});
