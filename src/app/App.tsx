import React from 'react';
import {MainPage} from "features/mainPage/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "features/login/Login";
import {useAppSelector} from "app/store";

const App = () => {

    const isAuth = useAppSelector(state => state.login.isAuth)
// TODO пофиксить - Navigate не рендерит страницу
    if (false) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/mainPage"} element={<MainPage/>}/>
            </Routes>
        </div>
    )

}

export default App;
