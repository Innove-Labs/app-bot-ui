import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.util";

export const fetchCompany = createAsyncThunk('company/fetchCompany', async ()=> {
    const response = await  axiosInstance().post('/api/auth/local');
    return response.data.data;
})

export interface CompanyState {
    name: string;
    services: {id: number, name: string }[];
    isLoading: boolean;
}

const initialState: CompanyState = {
    name: '',
    services: [],
    isLoading: false
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchCompany.fulfilled, (state, action) => {
            state = {
                ...action.payload,
                isLoading: false,
            }
        }),
        builder.addCase(fetchCompany.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(fetchCompany.rejected, (state) => {
            state.isLoading = false;
        })
    },
});

// export const {  } = companySlice.actions;

export default companySlice.reducer;