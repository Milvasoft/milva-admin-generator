import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { IAutoSelect } from '@src/modules/app/types/IAutoSelect';
import { Checkbox, SxProps } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface AutoSelectProps {
    fetchData?: () => Promise<any>,
    sx?: SxProps,
    label?: string,
    helperText?: string,
    multiple?: boolean,
    size?: 'small' | 'medium',
    limitTags?: number,
    value?: IAutoSelect | IAutoSelect[],
    onChangeValue? : (v:any) => void
}

export default function AutoSelect({
  fetchData,
  sx,
  label,
  multiple,
  size,
  limitTags,
  value,
  helperText,
  onChangeValue
}: AutoSelectProps) {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState<any[]>();

  const loading = open && options?.length === 0;

  useEffect(() => {

    let active = true;

    if (!loading) return undefined;
    
    (async () => {

      if (active && fetchData) {

        fetchData()
          .then((data: any) => data && setOptions(data))
          .catch(() => setOptions([]));
      
      }
    
    })();

    return () => {

      active = false;
    
    };
  
  }, [fetchData, loading]);

  const onOpen = useCallback(() => setOpen(true), []);
  
  const onClose = useCallback(() => setOpen(false), []);

  const onChange = useCallback((e, newValue) => onChangeValue?.(newValue), [onChangeValue]);
    
  return (
    <Autocomplete
      sx={sx}
      fullWidth
      value={value}
      onChange={onChange}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      isOptionEqualToValue={(option, value) => option?.title === value?.title}
      getOptionLabel={(option) => option?.title}
      options={options || []}
      loading={loading}
      multiple={multiple}
      size={size}
      limitTags={limitTags}
      loadingText={t('loading')}
      disableCloseOnSelect
      freeSolo
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            sx={{ mr: 1 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}      
          helperText={helperText}    
          placeholder={options?.length === 0 ? t('noContent') : undefined}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}      
    />
  );

}
