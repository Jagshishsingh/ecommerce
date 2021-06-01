import React,{useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';

import { Home, Login, Register,RegisterComplete } from './pages';
import Header from './components/nav/Header';
import {auth} from './firebase';
import ForgotPassword from './pages/ForgotPassword';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type : 'LOGGED_IN_USER',
          payload : {
            email: user.email,
            token : idTokenResult.token
          }
        })
      }
    });
    return () => unsubscribe();
  }, [])
  return (
    <>
      <Header />
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
      </Switch>
    </>
  );
}

export default App;
