import { configureStore } from '@reduxjs/toolkit';
import managedTable from '@src/modules/ManagedTable/redux/slice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    managedTable
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
