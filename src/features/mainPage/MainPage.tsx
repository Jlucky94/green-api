import classes from "./MainPage.module.css";
import React from "react";
import SideBar from "features/mainPage/sideBar/SideBar";
import Chat from "features/mainPage/chat/Chat";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "app/store";

export const MainPage = () => {
    const isAuth = useAppSelector(state => state.login.isAuth)

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={classes.container}>
            <SideBar/>
            <Chat/>
        </div>
    )
}