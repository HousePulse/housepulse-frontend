import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState = {
    sidebarActive: true,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSidebarActive: (state, action: PayloadAction<boolean>) => {
            state.sidebarActive = action.payload;
        }
    }
});

export const {
    setSidebarActive,
} = globalSlice.actions;
export default globalSlice.reducer;