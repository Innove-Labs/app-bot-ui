import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.util";
import ApiStatus from "../../enums";
import { UserType } from "../../enums/userType.enum";
import { Company } from "../../types/company.type";

export const checkLogin = createAsyncThunk('user/checkLogin', async ()=> {
    const response = await  axiosInstance().get('/api/auth/local');
    return response.data;
});

export const login = createAsyncThunk('user/login', async (params: unknown) => {
    const response = await  axiosInstance().post('/api/auth/login', params);
    return response.data;
})

export interface UserState {
    name?: string;
    phoneNumber?: string;
    email?: string;
    userType?: UserType;
    createdAt?: Date;
    company?: Company;
    isLoggedIn: boolean;
    status: ApiStatus
}

const initialState: UserState = {
    isLoggedIn: false,
    status: ApiStatus.IDLE
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
        builder.addCase(checkLogin.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true;
            state.status = ApiStatus.SUCCESS;
            state.company = payload.company;
            state.name = payload.name;
            state.phoneNumber = payload.phoneNumber;
            state.email = payload.email;
            state.userType = payload.userType;
            state.createdAt = payload.createdAt;
        }),
        builder.addCase(checkLogin.pending, (state) => {
            state.isLoggedIn = false;
            state.status = ApiStatus.PENDING
        }),
        builder.addCase(checkLogin.rejected, (state) => {            
            state.isLoggedIn = false;
            state.status = ApiStatus.FAILED
        }),
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true;
            state.status = ApiStatus.SUCCESS;
            state.company = payload.company;
            state.name = payload.name;
            state.phoneNumber = payload.phoneNumber;
            state.email = payload.email;
            state.userType = payload.userType;
            state.createdAt = payload.createdAt;
        }),
        builder.addCase(login.rejected, (state) => {
            state.isLoggedIn = false;
            state.status = ApiStatus.FAILED
        }),
        builder.addCase(login.pending, (state) => {
            state.isLoggedIn = false;
            state.status = ApiStatus.PENDING;
        })
    },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;