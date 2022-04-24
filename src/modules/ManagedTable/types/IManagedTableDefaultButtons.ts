export interface IManagedTableDefaultButtons{
    isAddHide?: boolean;
    isEditHide?: (rowData: any) => boolean;
    editClick?: (rowData: any) => void;
    isDeleteHide?: (rowData: any) =>boolean;
    deleteClick?: (rowData: any) => void;
}
