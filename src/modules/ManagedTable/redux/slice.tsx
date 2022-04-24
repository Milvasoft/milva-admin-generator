import { IDataInfo } from '@assets/types/IDataInfo';
import { IDrawerState } from '@assets/types/IDrawerState';
import { IPaginationDTO } from '@assets/types/IPaginationDTO';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ManagedTableState {
  data: IPaginationDTO<any>,
  dataInfo: IDataInfo<any>,
  loading: boolean,
  drawer:IDrawerState,
}

const initialState: ManagedTableState = {
  data: {},
  loading: true,
  dataInfo: { pageIndex: 1, requestedItemCount: 10 },
  drawer: { open: false },
};

export const managedTableSlice = createSlice({
  name: 'managedTable',
  initialState,
  reducers: {
    customTableSet: (state, action: PayloadAction<ManagedTableState>) => {

      state = { ...state, ...action.payload };
    
    },
    closeTableDrawer: (state) => {

      state.drawer = { ...state.drawer, open: false };
    
    },
    openTableDrawer: (state, action: PayloadAction<IDrawerState>) => {

      state.drawer = { ...action.payload, open: true, }; 
    
    },
    updateTableLoading: (state, action:PayloadAction<boolean>) => {

      state.loading = action.payload;
    
    },
    updateTableLoadingWithInfo: (state, action:PayloadAction<{loading: any, dataInfo: IDataInfo<any> }>) => {

      state.loading = action.payload.loading;

      state.dataInfo = action.payload.dataInfo;
    
    },
    updateDataAndInfo: (state, action: PayloadAction<{data: any, dataInfo: IDataInfo<any> }>) => {

      state.loading = false;

      state.data = action.payload.data;

      state.dataInfo = action.payload.dataInfo;
      
    },
    updateTableData: (state, action:PayloadAction<any>) => {

      state.loading = false;

      state.data = action.payload;
      
    },
    updateTableDataInfo: (state, action:PayloadAction<IDataInfo<any>>) => {

      state.dataInfo = action.payload;
      
    },
    resetTable: () => initialState
  },
});

export const { 
  customTableSet, 
  closeTableDrawer,
  openTableDrawer,
  updateTableLoading,
  updateDataAndInfo,
  updateTableData,
  updateTableLoadingWithInfo,
  updateTableDataInfo,
  
  resetTable

} = managedTableSlice.actions;

export default managedTableSlice.reducer;
