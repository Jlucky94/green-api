import React, {KeyboardEvent, useEffect, useState} from 'react';
import classes from "features/mainPage/chat/Chat.module.css";
import {useAppDispatch, useAppSelector} from "redux/store";
import {Button, TextField} from "@mui/material";
import {receiveNotificationTC, sendMessageTC} from "redux/mainPageSlice";
import ChatPlug from "features/mainPage/chatPlug/ChatPlug";

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

    useEffect(() => {
        const refresh = setInterval(() => {
            dispatch(receiveNotificationTC())
        }, 5000)
        return () => clearInterval(refresh)
    }, [])


    if (!currentChat) {
        return <ChatPlug/>
    }
    return (
        <div className={classes.content}>
            <div className={classes.chatHeader}>
                {currentChat ? `${contactsInfo[currentChat].contactName} (${currentChat})` : 'Select a chat'}
            </div>
            <div className={classes.chat}>
                {currentChat && contactsInfo[currentChat].messages
                    .map(message =>
                        <div className={classes.message} style={{alignSelf: message.byMe ? 'end' : 'start'}}>
                            {message.content}
                        </div>)}

            </div>
            <div className={classes.inputMsg}>
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    onKeyDown={onKeyDownSendMessage}
                    style={{width: 750, alignSelf: 'center'}}
                    label="Message"
                    multiline={true}
                    maxRows={3}
                    minRows={3}
                />
                <Button style={{width: 150, height: 100, alignSelf: 'center'}} onClick={onClickAddMessage}
                        variant={'outlined'} color={'inherit'}>Send</Button>
            </div>
        </div>
    );
};

export default Chat;