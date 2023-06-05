import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initialState = {
    isAuth: false,
    error: null as null | string,
    idInstance: '1101827729',
    apiTokenInstance: '7f3a987661cf4222824b5ce9a9fccb54d2641945e38742d28b'
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
    }
})

export const {reducer: loginReducer, actions: loginActions} = loginSlice
