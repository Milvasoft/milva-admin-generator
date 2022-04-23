import { IFormGenerator } from './IFormGenerator';

export interface ILangFormGenerator{
    arrayName: string,
    form: IFormGenerator[],
    defaultValues?: Array<{ systemLangugeId:any, [key: string]: any; }>
}
