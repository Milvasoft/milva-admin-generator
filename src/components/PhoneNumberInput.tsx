/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  FormControl, 
  FormHelperText, 
  Input,
  InputLabel,
  InputProps 
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
        definitions={{ '#': /[1-9]/, }}
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
}
  
export default function PhoneNumberInput(params: IPhoneNumberInput) {

  return (
    <FormControl variant="outlined">

      <InputLabel htmlFor="formatted-text-mask-input">{params?.label}</InputLabel>

      <Input {...params} inputComponent={TextMaskCustom as any} />

      {params?.helperText && <FormHelperText>{params?.helperText}</FormHelperText>}

    </FormControl>
  );

}
