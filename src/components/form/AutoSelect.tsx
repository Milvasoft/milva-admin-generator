/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-prototype-builtins */
import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Checkbox, SxProps, } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IAutoSelect } from '@src/modules/App/types/IAutoSelect';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';

interface AutoSelectProps {
    fetchData?: () => Promise<any>,
    sx?: SxProps,
    label?: string,
    helperText?: string,
    multiple?: boolean,
    size?: 'small' | 'medium',
    limitTags?: number,
    value?: IAutoSelect | IAutoSelect[],
    defaultValue?: IAutoSelect | IAutoSelect[],
    onChangeValue? : (v:any) => void,
    defaultOptions?:IAutoSelect[],
    getOptionDisabled?: (option:any) => boolean,

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
  onChangeValue,
  defaultOptions,
  defaultValue,
  getOptionDisabled,
}: AutoSelectProps) {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState<any[]>([]);

  const loading = open && options?.length === 0;

  const onOpen = useCallback(() => {

    setOpen(true);

    if (options === undefined) setOptions([]);

  }, [options]);
  
  const onClose = useCallback(() => setOpen(false), []);

  const onChange = useCallback((e, newValue) => onChangeValue?.(newValue), [onChangeValue]);
  
  useEffect(() => {
    
    if (fetchData === undefined && defaultOptions)setOptions(defaultOptions);
    
  }, [defaultOptions, fetchData]);
  
  useEffect(() => {

    let active = true;

    if (!loading) return undefined;
    
    (async () => {

      if (active && fetchData) {

        fetchData()
          .then((data: any) => data && setOptions(data))
          .catch(() => {

            // @ts-ignore 
            setOptions(undefined);

          });
      
      }
    
    })();

    return () => {

      active = false;
    
    };
  
  }, [fetchData, loading]);
   
  return (
    <Autocomplete
      sx={sx}
      value={value}
      defaultValue={defaultValue}
      disableCloseOnSelect={multiple}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
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
      freeSolo
      getOptionDisabled={getOptionDisabled}
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
          placeholder={(!options && !loading) ? t('noContent') : undefined}
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LISTBOX_PADDING = 8; // px

function renderRow(props: any) {

  const { data, index, style } = props;
  
  return React.cloneElement(data[index], { style: { ...style, top: style.top + LISTBOX_PADDING, }, });

}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref:any) => {

  const outerProps = React.useContext(OuterElementContext);

  return <div ref={ref} {...props} {...outerProps} />;

});

function useResetCache(data: any) {

  const ref = React.useRef<any>(null);

  React.useEffect(() => {

    if (ref.current != null) {

      ref.current?.resetAfterIndex(0, true);
    
    }
  
  }, [data]);

  return ref;

}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props: any, ref: any) {

  const { children, ...other } = props;

  const itemData = React.Children.toArray(children);

  const itemCount = itemData.length;

  const itemSize = 48;

  const getChildSize = (child: any) => {

    if (child?.hasOwnProperty('group')) {

      return 48;
    
    }

    return itemSize;
  
  };

  const getHeight = () => {

    if (itemCount > 8) {

      return 8 * itemSize;
    
    }

    return itemData.map(getChildSize).reduce((a: any, b: any) => a + b, 0);
  
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData?.[index])}
          overscanCount={10}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );

});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});
