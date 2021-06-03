import React,{useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';

import { Home, Login, Register,RegisterComplete } from './pages';
import Header from './components/nav/Header';
import {auth} from './firebase';
import ForgotPassword from './pages/ForgotPassword';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import HIstory from './pages/user/HIstory';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult();

        // /current-user
        currentUser(idTokenResult.token)
        .then(res=>{
            console.log(res);
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    name:res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role:res.data.role,
                    _id : res.data._id
                }
            });
        }).catch(error=>{
            console.log(error);
        });

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
        <UserRoute exact path='/user/history'component = {HIstory}/>
      </Switch>
    </>
  );
}

export default App;
