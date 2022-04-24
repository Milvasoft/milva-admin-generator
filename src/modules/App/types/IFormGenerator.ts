import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { DropzoneProps } from '@dropzone-ui/react/build/components/dropzone/components/Dropzone/DropzoneProps';
import { BoxProps, TextFieldProps } from '@mui/material';
import { IAutoSelect } from './IAutoSelect';

export interface IFormGenerator{

  input : FormInputEnum,
  
  /** All */
  isHidden?: boolean

  /** All */
  boxProps ?: BoxProps,

  /** All */
  helperText ?: string,

  /** All */
  defaultValue ?: any,

  /** All */
  title: string,

  /** All */
  name: string,

  /** All */
  validation ?: any,

  /** All */
  placeholder ?: string,

  /** Text, Number */
  textFieldProps?: TextFieldProps,

  /** CheckBox */
  checkList ?: Array<{ name: string, label: string, defaultChecked?: boolean }>,

  /** Radio */
  radioList ?: Array<{ value: any, label: string, }>,

  /** AutoSelect */
  multiple?: boolean,

  /** AutoSelect */
  limitTags?: number,
  
  /** AutoSelect */
  autoSelectRequired?: number,
   
  /** AutoSelect */
  fetchData?: () => Promise<any>,
   
  /** AutoSelect */
  defaultOptions?: IAutoSelect[],

  /** File */
  dropZoneProps?: DropzoneProps,
  imageUrl?: string
}

