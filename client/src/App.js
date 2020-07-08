import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions'
import Header from './components/header/header'
import ShopPage from './pages/shop/shopPage';
import CheckoutPage from './pages/checkout/checkout';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user-selector';
import HomePage from './pages/home/home';

const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }

    })
    return () => {
      unsubscribeFromAuth()
    }
    // es-lint-disable-next-line
  }, [setCurrentUser])

  return (
    <div>
      <Header />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SingInAndSignUpPage />)} />
      </Switch>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
