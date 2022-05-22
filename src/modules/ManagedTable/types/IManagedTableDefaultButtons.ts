export interface IManagedTableDefaultButtons{

    editButton?:{
        hide ?: (rowData: any) => boolean;
        click?: (rowData: any) => void;
        href?: string
    }
    deleteButton?:{
        hide ?: (rowData: any) => boolean;
        click?: (rowData: any) => void;
    }
    routeButton?:{
        show ?:boolean;
        href?: (rowData: any) => string;
        title: string,
    }
}
