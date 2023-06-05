import React from 'react';
import classes from "features/mainPage/sideBar/SideBar.module.css";
import AddNewChatModal from "features/mainPage/modals/AddNewChatModal";
import Contacts from "features/mainPage/sideBar/contacts/Contacts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IconButton, Tooltip} from "@mui/material";

const SideBar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarHeader}>
                <AccountCircleIcon fontSize={"large"}/>
                <div>
                    <Tooltip title={'Add chat'} arrow>
                        <IconButton>
                            <AddNewChatModal/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={classes.searchBar}>
                Search block
            </div>
            <div className={classes.contacts}>
                <Contacts/>
            </div>
        </div>
    );
};

export default SideBar;