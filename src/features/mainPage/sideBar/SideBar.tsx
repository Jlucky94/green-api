import React from 'react';
import classes from "features/mainPage/MainPage.module.css";
import AddNewChatModal from "features/mainPage/modals/AddNewChatModal";
import Contacts from "features/mainPage/sideBar/contacts/Contacts";

const SideBar = () => {
    return (
        <>
            <div className={classes.sidebarHeader}>
                <img src="index" alt="Your photo"/>
                <div>
                    <AddNewChatModal/>
                </div>
            </div>
            <div className={classes.searchBar}>
                SEARCH
            </div>
            <div className={classes.contacts}>
                <Contacts/>
            </div>
        </>
    );
};

export default SideBar;