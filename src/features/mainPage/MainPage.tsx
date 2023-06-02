import classes from "./MainPage.module.css";
import React from "react";

export const MainPage = () => (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
                <img src="index" alt="Your photo"/>
                <div>Your name, some settings</div>
            </div>
            <div className={classes.searchBar}>
                SEARCH
            </div>
            <div className={classes.contacts}>
                Your contacts
            </div>
        </div>
        <div className={classes.content}>
            <div className={classes.chatHeader}>
                Person name/Group chat name
            </div>
            <div className={classes.chat}>
                Chat here
            </div>
            <div className={classes.inputMsg}>
                Input msg
            </div>
        </div>
    </div>
)