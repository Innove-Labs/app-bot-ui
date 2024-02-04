import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.util";

export const checkLogin = createAsyncThunk('user/checkLogin', async ()=> {
    const response = await  axiosInstance().post('/auth/local');
    return response.data.data;
})

export interface UserState {
    name: string;
    phoneNumber: string;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const initialState: UserState = {
    name: '',
    phoneNumber: '',
    isLoggedIn: false,
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state: UserState) => {
            state.name = 'random';
        }
    },
    extraReducers(builder) {
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            state = {
                ...action.payload,
                isLoading: false,
                isLoggedIn: true
            }
        }),
        builder.addCase(checkLogin.pending, (state) => {
            state.isLoading = true;
            state.isLoggedIn = false;
        }),
        builder.addCase(checkLogin.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        })
    },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;