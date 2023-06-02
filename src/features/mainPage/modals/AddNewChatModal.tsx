import React, {useState} from 'react';
import {BasicModal} from "common/modal/basicModal";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Button, FormControl, FormGroup, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addNewChat} from "common/utils/yupResolvers/yupResolvers";
import {useAppDispatch} from "app/store";
import {ContactType, mainPageActions} from "features/mainPage/mainPageSlice";



const AddNewChatModal = () => {
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<ContactType>({resolver: yupResolver(addNewChat)});

    const onSubmit = handleSubmit((data) => {
        dispatch(mainPageActions.newContactAdded(data))
        handleClose()
    })

    return (
        <BasicModal
            title={"New Chat"}
            label={<PersonAddIcon/>}
            type={"icon"}
            isOpen={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
        >
            <form onSubmit={onSubmit}>
                <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                    <Controller
                        control={control}
                        name={'contactName'}
                        render={({field}) => (
                            <TextField
                                error={!!errors.contactName}
                                helperText={errors.contactName?.message}
                                variant={'outlined'}
                                label={'Contact name'}
                                value={field.value}
                                onChange={(e) => field.onChange(e)}
                            />)
                        }/>
                    <Controller
                        control={control}
                        name={'phoneNumber'}
                        render={({field}) => (
                            <TextField
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                variant={'outlined'}
                                label={'Phone number'}
                                value={field.value}
                                onChange={(e) => field.onChange(e)}
                            />
                        )
                        }/>
                    <Button
                        style={{width: 100, alignSelf: "end"}}
                        type="submit" variant={'contained'}
                        // disabled={isLoading === 'loading'}
                    >
                        Add contact
                    </Button>
                </FormGroup>
            </form>
        </BasicModal>
    );
};

export default AddNewChatModal;