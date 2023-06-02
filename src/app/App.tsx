import React from 'react';
import {MainPage} from "features/mainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import Login from "features/login/Login";

const App = () => (
    <div>
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/mainPage"} element={<MainPage/>}/>
        </Routes>
    </div>


)

export default App;
