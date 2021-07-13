import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import SideDrawer from "./components/drawer/SideDrawer";

import { Home, Login, Register, RegisterComplete, ForgotPassword, Product, Shop, Cart, Checkout } from './pages';
import Header from './components/nav/Header';
import { auth } from './firebase';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import { History, Wishlist, Password } from './pages/user';
import {
  AdminDashboard, CategoryCreate, CategoryUpdate,
  SubCreate, SubUpdate, ProductCreate, AllProducts,
  ProductUpdate, CreateCouponPage
} from './pages/admin';
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";




function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        // /current-user
        currentUser(idTokenResult.token)
          .then(res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
              }
            });
          }).catch(error => {
            console.log(error);
          });

      }
    });
    return () => unsubscribe();
  }, [])
  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <UserRoute exact path='/user/password' component={Password} />

        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

        <Route exact path='/product/:slug' component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
}

export default App;
