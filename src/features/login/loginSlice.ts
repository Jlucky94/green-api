import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initialState = {
    isAuth: false,
    error: null as null | string,
    idInstance: '',
    apiTokenInstance: ''
}

export type InitialStateType = typeof initialState
export type LoginDataType = {
    idInstance: string
    apiTokenInstance: string
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loggedIn: (state: InitialStateType, action: PayloadAction<LoginDataType>) => {
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance
            state.isAuth = true
        },
        loggedOut: (state: InitialStateType) => {
            state.idInstance = ''
            state.apiTokenInstance = ''
            state.isAuth = false
        }
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

export const {reducer: loginReducer, actions: loginActions} = loginSlice
