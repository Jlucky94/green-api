import React, {useState} from 'react';
import classes from './login.module.css'
import {Button, Container, FormGroup, Paper, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppDispatch, useAppSelector} from "app/store";
import {Link, useNavigate} from "react-router-dom";
import {loginActions, LoginDataType} from "features/login/loginSlice";
import {loginSchema} from "common/utils/yupResolvers/yupResolvers";


const Login = () => {
    const isLoading = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginDataType>({resolver: yupResolver(loginSchema)})

    const onSubmit = handleSubmit((data) => {
        dispatch(loginActions.loggedIn(data))
        navigate('/mainPage')
    })


    return (
        <div>
            <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                    <form onSubmit={onSubmit}>
                        <h2>Sign In</h2>
                        <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                            <Controller
                                control={control}
                                name={'idInstance'}
                                render={({field}) => (
                                    <TextField
                                        error={!!errors.idInstance}
                                        helperText={errors.idInstance?.message}
                                        variant={'outlined'}
                                        label={'idInstance'}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e)}
                                    />)
                                }/>
                            <Controller
                                control={control}
                                name={'apiTokenInstance'}
                                render={({field}) => (
                                        <TextField
                                            error={!!errors.apiTokenInstance}
                                            helperText={errors.apiTokenInstance?.message}
                                            variant={'outlined'}
                                            label={'apiTokenInstance'}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                        )
                                }/>
                            <Button type="submit" variant={'contained'} disabled={isLoading === 'loading'}>
                                Sign In
                            </Button>
                            <div>
                                Don't have an account?
                            </div>
                            <Link to="https://console.green-api.com/auth/register">
                                Sign Up
                            </Link>
                        </FormGroup>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;