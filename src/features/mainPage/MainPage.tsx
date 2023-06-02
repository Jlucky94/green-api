import classes from "./MainPage.module.css";
import React from "react";
import SideBar from "features/mainPage/sideBar/SideBar";
import Chat from "features/mainPage/chat/Chat";

export const MainPage = () => (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <SideBar/>
        </div>
        <div className={classes.content}>
           <Chat/>
        </div>
    </div>
)