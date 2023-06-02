import {createSlice} from "@reduxjs/toolkit";



export const initialState = {

}
export type InitialStateType = typeof initialState
export const authSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(loginTC.pending, (state) => {
        //         state.isLoading = true
        //         state.error = null
        //     })
        //     .addCase(loginTC.fulfilled, (state) => {
        //         state.isLoading = false
        //         state.error = null
        //     })
        //     .addCase(loginTC.rejected, (state, action) => {
        //         state.isLoading = false
        //         state.error = action.payload as string
        //     })
        //     .addCase(getAuthUserDataTC.fulfilled, state => {
        //         state.isAuth = true
        //     })


    }
})

export const {reducer: mainPageReducer, actions: mainPageActions} = authSlice
