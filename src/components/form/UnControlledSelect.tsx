import {
  FormControl, 
  InputLabel,
  MenuItem,
  Select, 
} from '@mui/material';
import { ISelectItem } from '@src/modules/App/types/ISelectItem';
import React, { memo } from 'react';
import { Controller } from 'react-hook-form';

type params = {
  label?: any,
  defaultValue?: any,
  name: string,
  disabled?: boolean,
  itemList?: Array<ISelectItem>,
  control: any,
}

export default memo(function UnControlledSelect({
  name,
  label,
  itemList,
  defaultValue,
  control,
  disabled,
}: params) {

  return (
    <FormControl variant="outlined" key={`${label}-select-form`}>

      <InputLabel>{label}</InputLabel>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={() => (
          <Select
            id={`${name}-select-id`}
            label={label}
            disabled={disabled}
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
        )}
      />

    </FormControl>
  );

});
