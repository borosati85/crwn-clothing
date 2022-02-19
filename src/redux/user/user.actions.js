import UserActionTypes from "./user.types";

const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})

const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})


const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

const signUpStart = (userData) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userData
})

const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export { googleSignInStart, signInSuccess, signInFailure, emailSignInStart, checkUserSession, signOutStart, signOutSuccess, signOutFailure, signUpStart, signUpSuccess, signUpFailure }