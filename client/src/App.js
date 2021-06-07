import React,{useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';

import { Home, Login, Register,RegisterComplete,ForgotPassword } from './pages';
import Header from './components/nav/Header';
import {auth} from './firebase';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import History from './pages/user/HIstory';
import Wishlist from './pages/user/Wishlist';
import Password from './pages/user/Password';
import AdminDashboard from './pages/admin/AdminDashboard';
import {CategoryCreate,CategoryUpdate} from "./pages/admin/category";

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
        <UserRoute exact path='/user/history'component = {History}/>
        <UserRoute exact path='/user/wishlist'component = {Wishlist}/>
        <UserRoute exact path='/user/password'component = {Password}/>
        <AdminRoute exact path='/admin/dashboard'component = {AdminDashboard}/>
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
      </Switch>
    </>
  );
}

export default App;
