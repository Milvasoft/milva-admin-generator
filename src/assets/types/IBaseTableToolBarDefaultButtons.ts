export interface IBaseTableToolBarDefaultButtons {

    add: {
        title?: string;
        click?:() => void,
        hide?: (data: any[]) =>boolean,
    }
}
