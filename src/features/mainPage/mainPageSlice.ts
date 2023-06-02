import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chatAPI, SendMsgRequestType, SendMsgResponseType} from "api/chatAPI";
import {AsyncConfigType} from "app/appSlice";
import {useAppSelector} from "app/store";

export type ContactsType = {
    [phoneNumber: number]: ContactType
}
export type MessageType = {
    time: string
    content: string
    byMe: boolean
}
export type ContactType = {
    contactName: string
    phoneNumber: number
    messages: MessageType[]
}
export const initialState = {
    currentChat: 0,
    contactsList: [] as number[],
    contactsInfo: {} as ContactsType
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
        chatSelected: (state: InitialStateType, action: PayloadAction<{ phoneNumber: number }>) => {
            state.currentChat = action.payload.phoneNumber
        },
        messageSent: (state: InitialStateType, action: PayloadAction<{ message: string }>) => {
            state.contactsInfo[state.currentChat].messages.push({
                byMe: true,
                content: action.payload.message,
                time: '10.20.1994'
            })
        }
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(loginTC.pending, (state) => {
        //         state.isLoading = true
        //         state.error = null
        //     })
        //     .addCase(loginTC.fulfilled, (state) => {
        //         state.isLoading = false
        //         state.error = null
        //     })
        //     .addCase(loginTC.rejected, (state, action) => {
        //         state.isLoading = false
        //         state.error = action.payload as string
        //     })
        //     .addCase(getAuthUserDataTC.fulfilled, state => {
        //         state.isAuth = true
        //     })


    }
})

export const {reducer: mainPageReducer, actions: mainPageActions} = authSlice

//thunks
export const sendMessageTC = createAsyncThunk<SendMsgResponseType, { message: string, phoneNumber: number }, AsyncConfigType>
('chat/sendMsg',
    async (data: { message: string, phoneNumber: number }, thunkAPI) => {
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
