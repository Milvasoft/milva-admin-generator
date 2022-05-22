import {
  FormControl, 
  InputLabel,
  MenuItem,
  Select, 
} from '@mui/material';
import { ISelectItem } from '@src/modules/App/types/ISelectItem';
import React, { memo } from 'react';

type params = {
  label?: any,
  defaultValue?: any,
  name: string,
  disabled?: boolean,
  itemList?: Array<ISelectItem>,
  setValue: any,
}

export default memo(function UnControlledSelect({
  name,
  label,
  itemList,
  defaultValue,
  disabled,
  setValue
}: params) {

  return (
    <FormControl variant="outlined" key={`${label}-select-form`} fullWidth>

      <InputLabel>{label}</InputLabel>

      <Select
        id={`${name}-select-id`}
        label={label}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={(e) => setValue(name, e.target.value)}
      >
        {itemList?.map((item) => (
          <MenuItem
            value={item.value}
            key={item.value}
          >
            {item.label}

          </MenuItem>
        ))}
      </Select>


    </FormControl>
  );

});
