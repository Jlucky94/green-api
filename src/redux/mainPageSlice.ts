import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chatAPI, ReceiveNotificationResponseType, SendMsgResponseType} from "api/chatAPI";
import {AsyncConfigType} from "redux/appSlice";

export type ContactsType = {
    [phoneNumber: string]: ContactType
}
export type MessageType = {
    time: string
    content: string
    byMe: boolean
}
export type ContactType = {
    contactName: string
    phoneNumber: string
    messages: MessageType[]
}
export const initialState = {
    currentChat: '',
    contactsList: ['905360209464', '79147568425', '79147577260'] as string[],
    contactsInfo: {
        ['905360209464']: {contactName: 'Me', phoneNumber: '905360209464', messages: []},
        ['79147568425']: {contactName: 'Lilia', phoneNumber: '79147568425', messages: []},
        ['79147577260']: {contactName: 'Papa', phoneNumber: '79147577260', messages: []}
    } as ContactsType
}
export type InitialStateType = typeof initialState
export const authSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        newContactAdded: (state: InitialStateType, action: PayloadAction<Omit<ContactType, 'messages'>>) => {
            state.contactsInfo[action.payload.phoneNumber] = {
                contactName: action.payload.contactName,
                phoneNumber: action.payload.phoneNumber,
                messages: []
            }
            state.contactsList.push(action.payload.phoneNumber)
        },
        chatSelected: (state: InitialStateType, action: PayloadAction<{ phoneNumber: string }>) => {
            state.currentChat = action.payload.phoneNumber
        },
        messageSent: (state: InitialStateType, action: PayloadAction<{ message: string }>) => {
            state.contactsInfo[state.currentChat].messages.push({
                byMe: true,
                content: action.payload.message,
                time: '29.10.1994'
            })
        },
        messageReceived: (state: InitialStateType, action: PayloadAction<{ notification: ReceiveNotificationResponseType }>) => {
            if (action.payload.notification.body.typeWebhook === 'incomingMessageReceived') {
                const senderPhoneNumber = action.payload.notification.body.senderData.sender.split('@')[0]
                if (action.payload.notification.body.messageData.typeMessage === 'textMessage'
                    && state.currentChat === senderPhoneNumber) {
                    state.contactsInfo[state.currentChat].messages.push({
                        byMe: false,
                        content: action.payload.notification.body.messageData.textMessageData.textMessage,
                        time: '22.12.2023'
                    })
                }
            }
        }
    }
})

export const {reducer: mainPageReducer, actions: mainPageActions} = authSlice

//thunks
export const sendMessageTC = createAsyncThunk<SendMsgResponseType, { message: string, phoneNumber: string }, AsyncConfigType>
('chat/sendMsg',
    async (data: { message: string, phoneNumber: string }, thunkAPI) => {
        try {
            const idInstance = thunkAPI.getState().login.idInstance
            const apiTokenInstance = thunkAPI.getState().login.apiTokenInstance
            const response = await chatAPI.sendMsg(data.message, data.phoneNumber, idInstance, apiTokenInstance)
            thunkAPI.dispatch(mainPageActions.messageSent({message: data.message}))
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const receiveNotificationTC = createAsyncThunk<ReceiveNotificationResponseType, void, AsyncConfigType>
('chat/receiveNotification',
    async (_, thunkAPI) => {
        try {
            const idInstance = thunkAPI.getState().login.idInstance
            const apiTokenInstance = thunkAPI.getState().login.apiTokenInstance
            const response = await chatAPI.receiveNotification(idInstance, apiTokenInstance)
            thunkAPI.dispatch(mainPageActions.messageReceived({notification: response}))
            thunkAPI.dispatch(deleteNotificationTC({receiptId: response.receiptId}))
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const deleteNotificationTC = createAsyncThunk<{ result: boolean }, { receiptId: number }, AsyncConfigType>
('chat/deleteNotification',
    async (data: { receiptId: number }, thunkAPI) => {
        try {
            const idInstance = thunkAPI.getState().login.idInstance
            const apiTokenInstance = thunkAPI.getState().login.apiTokenInstance
            const response = await chatAPI.deleteNotification(data.receiptId, idInstance, apiTokenInstance)
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })

