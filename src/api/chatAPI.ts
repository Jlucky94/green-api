import axios, {AxiosResponse} from "axios";

export const baseURL = 'https://api.green-api.com/'

const instance = axios.create({
    // withCredentials: true,
    baseURL: baseURL
})


export const chatAPI = {
    sendMsg: (message: string, phoneNumber: string, idInstance: string, apiTokenInstance: string) => {
        return instance.post<SendMsgRequestType, AxiosResponse<SendMsgResponseType>>(
            `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            {
                chatId: phoneNumber + '@c.us',
                message: message
            }).then(response => {
            return response.data
        })
    },
    receiveNotification: (idInstance: string, apiTokenInstance: string) => {
        return instance.get<ReceiveNotificationResponseType>(`waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
            .then(response => {
                return response.data
            })
    },
    deleteNotification: (receiptId: number, idInstance: string, apiTokenInstance: string) => {
        return instance.delete<{ result: boolean }>(`waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`)
            .then(response => {
                return response.data
            })
    }
}

///types

export type WebhooksType =
    'incomingMessageReceived'
    | 'outgoingMessageReceived'
    | 'outgoingAPIMessageReceived'
    | 'outgoingMessageStatus'
    | 'stateInstanceChanged'
    | 'statusInstanceChanged'
    | 'deviceInfo'
    | 'incomingCall'

export type SendMsgRequestType = {
    chatId: string
    message: string
}
export type SendMsgResponseType = {
    idMessage: string
}

export type ReceiveNotificationResponseType = {
    receiptId: number
    body: NotificationBodyType
}
export type NotificationBodyType = {
    typeWebhook: WebhooksType
    instanceData: {
        idInstance: number
        wid: string
        typeInstance: string
    }
    timestamp: number
    idMessage: string
    senderData: SenderDataType
    messageData: MessageDataType

}
export type SenderDataType = {
    chatId: string
    chatName: string
    sender: string
    senderName: string
}
export type MessageDataType = {
    typeMessage: string
    textMessageData: {
        textMessage: string
    }
}
//
//
// export type OutGoingMsgBodyType = {
//     typeWebhook: WebhooksType
//     chatId: string
//     instanceData: InstanceDataType
//     timestamp: number
//     idMessage: string
//     status: string
//     sendByApi: boolean
// }
// export type InstanceDataType = {
//     idInstance: number
//     wid: string
//     typeInstance: string
// }