import Header from './components/nav/Header';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, Register,RegisterComplete } from './pages';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
      </Switch>
    </>
  );
}

export default App;
