import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "app/appSlice";
import {loginReducer} from "features/login/loginSlice";
import {mainPageReducer} from "features/mainPage/mainPageSlice";



export const store = configureStore({
    reducer: {
        app: appReducer,
        login: loginReducer,
        mainPage: mainPageReducer,


    },
})


export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector