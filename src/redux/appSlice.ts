import {createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType, ThunkAppDispatchType} from "redux/store";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appInitialState = {
    // error: null as string | null,
    // status: 'idle' as AppStatusType,
    // infoMessage: null as string | null,
}

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {},
    extraReducers: builder => {
    }
})

export const {reducer: appReducer, actions: appActions} = appSlice

//thunks


export type AsyncConfigType = {
    dispatch: ThunkAppDispatchType,
    rejectWithValue: string,
    state: AppRootStateType
}
