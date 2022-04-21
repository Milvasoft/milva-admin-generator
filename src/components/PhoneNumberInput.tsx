/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  FormControl, 
  FormHelperText, 
  InputLabel,
  InputProps, 
  OutlinedInput
} from '@mui/material';
import { IMaskInput } from 'react-imask';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  
const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {

    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="0 (000) 000 00 00"
        // @ts-ignore
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  
  },
);

interface IPhoneNumberInput extends InputProps{
    label?: string,
    helperText?: string;
    handleChange?: (value:any) => void

}
  
export default function PhoneNumberInput(params: IPhoneNumberInput) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => params?.handleChange?.(event.target.value);
  
  return (
    <FormControl fullWidth>

      <InputLabel htmlFor="formatted-text-mask-input">{params?.label}</InputLabel>

      <OutlinedInput 
        {...params}
        onChange={handleChange} 
        inputComponent={TextMaskCustom as any} 
      />

      {params?.helperText && <FormHelperText>{params?.helperText}</FormHelperText>}

    </FormControl>
  );

}
