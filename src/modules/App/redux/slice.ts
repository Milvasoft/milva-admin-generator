import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppReducer {
   user?: any,
   accessToken?: string;
}

const initialState: IAppReducer = {};

export const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setLoginInfo: (state, action: PayloadAction<any>) => {

      state.user = action.payload?.user;
      
      state.accessToken = action.payload?.accessToken;
    
    },
  },
});

export const { 
  setLoginInfo,
  
} = appSlice.actions;

export default appSlice.reducer;
