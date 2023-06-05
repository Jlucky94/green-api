import React from 'react';
import classes from 'features/mainPage/chatPlug/ChatPlug.module.css'

const ChatPlug = () => {
    return (
        <div className={classes.body}>
            <h1 style={{margin: 0}}>Messenger</h1>
            <div>Send and receive messages</div>
        </div>
    );
};

export default ChatPlug;