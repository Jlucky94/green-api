import React from 'react';
import {MainPage} from "features/mainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import Login from "features/login/Login";
import {Paper} from "@mui/material";

const App = () => {


    return (
        <div style={{display: 'flex', background: '#eae6df', alignItems: 'center', justifyContent: 'center'}}>
            <Paper elevation={5}
                   style={{width: '70%', height: 'calc(100vh - 100px)', marginTop: 50, marginBottom: 50}}>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/mainPage"} element={<MainPage/>}/>
                </Routes>
            </Paper>
        </div>
    )

}

export default App;
