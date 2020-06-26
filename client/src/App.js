import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header'
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

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
  }, [])
  console.log(currentUser)
  return (
    <div>
      <Header currentUser={currentUser} />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SingInAndSignUpPage} />
      </Switch>

    </div>
  );
}

export default App;
