import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "redux/store";
import {mainPageActions} from "redux/mainPageSlice";
import classes from './Contacts.module.css'

const Contacts = () => {
    const contactsList = useAppSelector(state => state.mainPage.contactsList)
    const contactsInfo = useAppSelector(state => state.mainPage.contactsInfo)

    const dispatch = useAppDispatch()

    const [selectedContact, setSelectedContact] = useState('')

    const contactOnClick = (phoneNumber: string) => () => {
        dispatch(mainPageActions.chatSelected({phoneNumber}))
        setSelectedContact(phoneNumber)
    }


    return (
        <>
            {contactsList.map(phoneNumber =>
                <div onClick={contactOnClick(phoneNumber)}
                     className={phoneNumber === selectedContact ? classes.selected : ''}
                     style={{borderBottom: 'groove 2px', padding: 2, cursor: 'pointer', margin: 2}}
                >
                    {contactsInfo[phoneNumber].contactName}
                </div>
            )}
        </>
    );
};

export default Contacts;