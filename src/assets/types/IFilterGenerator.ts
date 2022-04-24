import { IFormGenerator } from './IFormGenerator';

export interface IFilterGenerator extends IFormGenerator{
    
    filterTitle: string;
    filterValuePropertyName: string

}
