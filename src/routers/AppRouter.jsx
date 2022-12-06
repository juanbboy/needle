import React, { useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginScreen from '../components/login/LoginScreen';
import DashboardRouter from './DashboardRouter';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import RegisterScreen from '../components/login/RegisterScreen';
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';




const AppRouter = () => {

    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(true);

    const [isLogged, setIsLogged] = useState(false);


    const lastPath = localStorage.getItem('lastPath') || '/needle';

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if (user?.uid) {
                setIsLogged(true);
                dispatch(login(user.uid, user.displayName));
            } else {
                setIsLogged(false);
            }
            setIsReady(false);
        })
    }, [dispatch, setIsLogged, setIsReady]);

    if (isReady) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-grow text-warning" role="status" aria-hidden="true">
                </div>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/login" element={<LoginScreen />} /> */}
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/login" element={
                    <PublicRouter isLogged={isLogged} lastPath={lastPath}>
                        <LoginScreen />
                    </PublicRouter>
                } />


                <Route path="/*" element={
                    <PrivateRouter isLogged={isLogged}>
                        <DashboardRouter />
                    </PrivateRouter>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
