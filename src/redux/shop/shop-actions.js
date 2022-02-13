import ShopActionTypes from './shop-types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, onSnapshot } from 'firebase/firestore';

const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.fetchCollectionsFailure,
    payload: errorMessage
})

const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = collection(firestore, 'collections');
        dispatch(fetchCollectionsStart())

        onSnapshot(collectionRef, async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap))
            }, 
            error => dispatch(fetchCollectionsFailure(error.message))
        )
    }
}

export { fetchCollectionsStartAsync };