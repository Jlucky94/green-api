import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "app/store";
import {mainPageActions} from "features/mainPage/mainPageSlice";
import classes from './Contacts.module.css'

const Contacts = () => {
    const contactsList = useAppSelector(state => state.mainPage.contactsList)
    const contactsInfo = useAppSelector(state => state.mainPage.contactsInfo)

    const dispatch = useAppDispatch()

    const [selectedContact, setSelectedContact] = useState(0)

    const contactOnClick = (phoneNumber: number) => () => {
        dispatch(mainPageActions.chatSelected({phoneNumber}))
        setSelectedContact(phoneNumber)
    }


    return (
        <>
            {contactsList.map(phoneNumber =>
                <div onClick={contactOnClick(phoneNumber)}
                     className={phoneNumber === selectedContact ? classes.selected : ''}>
                    {contactsInfo[phoneNumber].contactName}
                </div>
            )}
        </>
    );
};

export default Contacts;