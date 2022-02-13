import { createSelector } from "reselect";

const selectShop = state => state.shop;

const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

const selectCollection = collectionUrlParams => createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParams] : null
)

const selectCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

const selectCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)

export { selectShop, selectCollections, selectCollection, selectCollectionsForPreview, selectCollectionFetching, selectCollectionsLoaded };