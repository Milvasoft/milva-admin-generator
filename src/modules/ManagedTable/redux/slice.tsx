import { IDataInfo } from '@assets/types/IDataInfo';
import { IDrawerState } from '@assets/types/IDrawerState';
import { IPaginationDTO } from '@assets/types/IPaginationDTO';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IManagedTable } from '../types/IManagedTable';

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

export const refreshTable = createAsyncThunk(
  'refreshTable', 
  async (data:Pick<IManagedTable, 'fetchData'>) => {

    let response = {};

    await data?.fetchData?.()
      .then((res) => {

        response = res?.result;
      
      });

    return response;
  
  }
);

export const refreshTableForPagination = createAsyncThunk(
  'refreshTable', 
  async (data:Pick<IManagedTable, 'fetchPaginationData'>, thunkAPI) => {

    const { dataInfo } : any = thunkAPI.getState();

    let response = {};

    await data?.fetchPaginationData?.(dataInfo)
      .then((res) => {

        response = res?.result;
      
      });

    return response;
  
  }
);


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
  extraReducers: {
    [refreshTable.pending.type]: (state) => {

      state.loading = true;
    
    },
    [refreshTable.fulfilled.type]: (state, action) => {

      state.data = { dtoList: action?.payload };

      state.loading = false;  
    
    },
    [refreshTable.rejected.type]: (state) => {

      state.data = {};
     
      state.loading = false;
    
    },
    [refreshTableForPagination.pending.type]: (state) => {

      state.loading = true;
    
    },
    [refreshTableForPagination.fulfilled.type]: (state, action) => {

      state.data = action?.payload;

      state.loading = false;  
    
    },
    [refreshTableForPagination.rejected.type]: (state) => {

      state.data = {};
     
      state.loading = false;
    
    },


  }
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
  resetTable,  
} = managedTableSlice.actions;

export default managedTableSlice.reducer;
