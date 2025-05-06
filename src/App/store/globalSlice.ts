import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState = {
    sidebarActive: true,
    selectedDate: new Date(),
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSidebarActive: (state, action: PayloadAction<boolean>) => {
            state.sidebarActive = action.payload;
        },
        setSelectedDate: (state, action: PayloadAction<Date>) => {
            state.selectedDate = action.payload
        }
    }
});

export const {
    setSidebarActive,
    setSelectedDate
} = globalSlice.actions;
export default globalSlice.reducer;