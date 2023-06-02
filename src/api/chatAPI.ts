import axios, {AxiosResponse} from "axios";
import {useAppSelector} from "app/store";

export const baseURL = 'https://api.green-api.com/'

const instance = axios.create({
    // withCredentials: true,
    baseURL: baseURL
})



export const chatAPI = {
    sendMsg: (message: string, phoneNumber: number,idInstance:string,apiTokenInstance:string) => {
        return instance.post<SendMsgRequestType, AxiosResponse<SendMsgResponseType>>(
            `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            {
                chatId: phoneNumber + '@c.us',
                message: message
            }).then(response => {
            return response.data
        })
    },
}
export type SendMsgRequestType = {
    chatId: string
    message: string
}
export type SendMsgResponseType = {
    idMessage: string
}