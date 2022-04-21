import { FormInputEnum } from '@assets/enums/FormInputEnum';

export interface IFormGenerator{

  input : FormInputEnum

  /** All */
  helperText ?: string,

  /** All */
  defaultValue ?: any,

  /** All */
  title: string,

  /** All */
  name : string,

  /** All */
  validation ?: any,

  /** All */
  placeholder ?: string,

  /** CheckBox */
  checkList ?: Array<{ name: string, label: string, defaultChecked?: boolean }>,

  /** AutoSelect */
  multiple?: boolean,

  /** AutoSelect */
  limitTags?: number,
  
  /** AutoSelect */
  autoSelectRequired?: number,
   
  /** AutoSelect */
  fetchData?: () => Promise<any>,

}

