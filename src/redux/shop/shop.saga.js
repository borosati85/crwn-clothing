import { takeEvery, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop-types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop-actions';
import { collection, getDocs } from 'firebase/firestore';



export function* fetchCollectionAsync() {
    try {
        const collectionRef = collection(firestore, 'collections');    
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}