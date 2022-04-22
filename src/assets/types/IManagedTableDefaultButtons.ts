export interface IManagedTableDefaultButtons {
    isAddHide?: boolean;
    isEditHide?: (rowData: any) => boolean;
    isDeleteHide?: (rowData: any) =>boolean;
}
