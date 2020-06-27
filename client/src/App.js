import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions'
import Header from './components/header/Header'
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = ({ setCurrentUser }) => {

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
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SingInAndSignUpPage} />
      </Switch>

    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
