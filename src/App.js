import React from "react";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage.component";
import ShopPage from "./pages/ShopPage/ShopPage.component";
import CollectionsPageOverviewContainer from "./pages/CollectionPage/collection-page-container.component";
import SignInPage from "./pages/Signin/SigninPage.component";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.component";
import Header from "./components/header/header.component";

import { Route, Routes, Navigate } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";

import { connect } from "react-redux";
import setCurrentUser from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import selectCurrentUser from "./redux/user/user.selectors";
import { selectCollections, selectCollectionFetching, selectCollectionsLoaded } from "./redux/shop/shop-selectors"
import { fetchCollectionsStartAsync } from './redux/shop/shop-actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, fetchCollectionsAsync } = this.props;
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()           
          })
        })
      } else {
        setCurrentUser(null);
      }
    })   
    
    fetchCollectionsAsync();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:collectionID' element={<CollectionsPageOverviewContainer />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/signin'
            element={this.props.currentUser ? <Navigate to='/'/> : <SignInPage />}            
            />
        </Routes>
      </div>
    );
  }
}

const dispatchStateToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchCollectionsAsync: ()=> dispatch(fetchCollectionsStartAsync())
})

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    collections: selectCollections,
    isCollectionFetching: selectCollectionFetching,
    isCollectionsLoaded: selectCollectionsLoaded
})

export default connect(mapStateToProps, dispatchStateToProps)(App);
