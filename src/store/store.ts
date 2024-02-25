import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
