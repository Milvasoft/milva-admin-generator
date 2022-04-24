import { IFormGenerator } from './IFormGenerator';

export interface ILangFormGenerator{
    arrayName: string,
    form: IFormGenerator[],
    defaultValues?: Array<{ systemLanguageId:any, [key: string]: any; }>
}
