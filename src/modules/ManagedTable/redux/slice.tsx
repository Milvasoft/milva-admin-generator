/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataInfo } from '@src/modules/App/types/IDataInfo';
import { IDrawerState } from '@src/modules/App/types/IDrawerState';
import { IPaginationDTO } from '@src/modules/App/types/IPaginationDTO';
import CancelablePromise from '@utils/CancelablePromise';
import { Result as ApiResult } from '@utils/network/networkParams';

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

type fetchDataType = () => CancelablePromise<ApiResult<any[]>>;

export const refreshTable = createAsyncThunk(
  'refreshTable', 
  async (fetchData:fetchDataType) => {

    let response = {};

    await fetchData()
      .then((res) => {

        response = res?.result;
      
      });

    return response;
  
  }
);

type fetchPaginationDataType = (data:IDataInfo<any>) => CancelablePromise<ApiResult<IPaginationDTO<any>>>;

export const refreshTableForPagination = createAsyncThunk(
  'refreshTableForPagination', 
  async (fetchPaginationData:fetchPaginationDataType, thunkAPI) => {

    // @ts-ignore
    const dataInfo : any = thunkAPI?.getState()?.managedTable?.dataInfo;

    let response = {};

    await fetchPaginationData(dataInfo)
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
    updateTableDrawerData: (state, action: PayloadAction<any>) => {

      state.drawer = { ...state.drawer, data: action.payload, }; 
    
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

      state.drawer = { ...state.drawer, open: false };
    
    },
    [refreshTable.fulfilled.type]: (state, action) => {

      state.data = { dtoList: action?.payload };

      state.loading = false;  
    
    },
    [refreshTable.rejected.type]: (state) => {

      state.data = {};
     
      state.loading = false;

      state.drawer = { ...state.drawer, open: false };
    
    },
    [refreshTableForPagination.pending.type]: (state) => {

      state.loading = true;

      state.drawer = { ...state.drawer, open: false };
    
    },
    [refreshTableForPagination.fulfilled.type]: (state, action) => {

      state.data = action?.payload;

      state.loading = false;  
    
    },
    [refreshTableForPagination.rejected.type]: (state) => {

      state.data = {};
     
      state.loading = false;
      
      state.drawer = { ...state.drawer, open: false };
    
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
  updateTableDrawerData
  
} = managedTableSlice.actions;

export default managedTableSlice.reducer;
