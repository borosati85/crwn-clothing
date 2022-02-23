import React, { useEffect } from "react";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage.component";
import ShopPage from "./pages/ShopPage/ShopPage.component";
import CollectionsPageOverviewContainer from "./pages/CollectionPage/collection-page-container.component";
import SignInPage from "./pages/Signin/SigninPage.component";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.component";
import Header from "./components/header/header.component";

import { Route, Routes, Navigate } from "react-router-dom"; 

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectCurrentUser from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCollections, selectCollectionFetching, selectCollectionsLoaded } from "./redux/shop/shop-selectors"
import { fetchCollectionsStart } from './redux/shop/shop-actions';

const App = ({ fetchCollectionsStart, checkUserSession, currentUser }) => {
  useEffect(() => {
    fetchCollectionsStart();
    checkUserSession();
  },[fetchCollectionsStart, checkUserSession])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:collectionID' element={<CollectionsPageOverviewContainer />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/signin'
          element={currentUser ? <Navigate to='/'/> : <SignInPage />}            
          />
      </Routes>
    </div>
  );
}

const dispatchStateToProps = (dispatch) => ({
  fetchCollectionsStart: ()=> dispatch(fetchCollectionsStart()),
  checkUserSession: ()=> dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    collections: selectCollections,
    isCollectionFetching: selectCollectionFetching,
    isCollectionsLoaded: selectCollectionsLoaded
})

export default connect(mapStateToProps, dispatchStateToProps)(App);
