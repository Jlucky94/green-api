import React, {KeyboardEvent, useState} from 'react';
import classes from "features/mainPage/MainPage.module.css";
import {useAppDispatch, useAppSelector} from "app/store";
import {Button, TextField} from "@mui/material";
import {mainPageActions, sendMessageTC} from "features/mainPage/mainPageSlice";

const Chat = () => {
    const dispatch = useAppDispatch()

    const currentChat = useAppSelector(state => state.mainPage.currentChat)
    const contactsInfo = useAppSelector(state => state.mainPage.contactsInfo)

    const [message, setMessage] = useState('')

    const onClickAddMessage = () => {
        dispatch(sendMessageTC({message: message, phoneNumber: currentChat}))
        setMessage('')
    }
    const onKeyDownSendMessage = (e: KeyboardEvent<HTMLDivElement>) => (e.key === 'Enter') && onClickAddMessage

    return (
        <>
            <div className={classes.chatHeader}>
                {currentChat ? `${contactsInfo[currentChat].contactName} (${currentChat})` : 'Select a chat'}
            </div>
            <div className={classes.chat}>
                {currentChat && contactsInfo[currentChat].messages
                    .map(message => <div>{message.content}</div>)}

            </div>
            <div className={classes.inputMsg}>
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyDown={onKeyDownSendMessage}
                    style={{width: 750}}
                    label="Message"
                    id="fullWidth"
                    multiline={true}
                    maxRows={3}
                    minRows={3}
                />
                <Button onClick={onClickAddMessage} variant={'outlined'}>Send</Button>
            </div>
        </>
    );
};

export default Chat;