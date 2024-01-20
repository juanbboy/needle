import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { startLoading, finishLoading, setError } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(setError(e.message));
                dispatch(finishLoading());
            })
    }
}

export const startRegisterEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                // console.log(user);
                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
        //dispatch(removeError())
    }
}

export const login = (uid, displayName) => {
    return ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    })
}


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})