import * as yup from 'yup'


export const loginSchema = yup.object().shape({
    idInstance: yup.string().required('This field is required'),
    apiTokenInstance: yup.string().required('This field is required')
})
export const addNewChat = yup.object().shape({
    contactName:yup.string().required(),
    phoneNumber:yup.string().required()
})