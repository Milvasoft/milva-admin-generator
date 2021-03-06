import { FormInputEnum } from '@assets/enums/FormInputEnum';
import { DropzoneProps } from '@dropzone-ui/react/build/components/dropzone/components/Dropzone/DropzoneProps';
import { BoxProps, TextFieldProps } from '@mui/material';
import { IAutoSelect } from './IAutoSelect';
import { ISelectItem } from './ISelectItem';

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

  /** Lang */
  defaultLangValidation ?: any,

  /** Lang */
  defaultLangHelperText ?: string,

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
  autoSelectRequired?: boolean,
   
  /** AutoSelect */
  fetchData?: () => Promise<any>,
   
  /** AutoSelect */
  defaultOptions?: IAutoSelect[],

  /** File */
  dropZoneProps?: DropzoneProps,
    
  /** Image */
  imageUrl?: string
 
  /** Image Alt */
  imageAltValue?: string

  /** Select Disabled */
  selectList?: Array<ISelectItem>,

  /** Select Disabled */
  selectDisabled?: boolean,

}

