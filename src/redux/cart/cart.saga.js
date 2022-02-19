import UserActionTypes from "../user/user.types";
import { clearCart } from './cart.actions'
import { all, call, put, takeLatest } from "redux-saga/effects";

function* clearCartonSignOut() {
    yield put(clearCart())
}

function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartonSignOut)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ])
}