import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { getDoc } from "firebase/firestore";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {        
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield getDoc(userRef);
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()           
          }));
    } catch(error) {
        yield put(signInFailure(error))
    }
}

function* signInWithGoogle() {
    try {        
        const { user } = yield signInWithPopup(auth, googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error))
    }
}

function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* signInWithEmail({payload: {email, password}}) {    
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error))
    }
}

function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInFailure(error))
    }
}

function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* startSignOut() {
    try {
        yield signOut(auth);
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error))
    }
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, startSignOut)
}

function* signUp({payload: {displayName, email, password, confirmPassword}}) {
    if (password !== confirmPassword) {
        alert("Password don't match");
        return;
    }
    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch(error) {
        yield put(signUpFailure(error));
    }
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)

}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}