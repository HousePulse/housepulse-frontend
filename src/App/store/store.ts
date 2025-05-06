import {configureStore, createSelector} from '@reduxjs/toolkit';
import globalSlice from "./globalSlice";
import userSlice from "./userSlice";
import {useDispatch, useSelector} from "react-redux";

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppSelector = createSelector.withTypes<RootState>()

export default store;