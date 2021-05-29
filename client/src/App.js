import Header from './components/nav/Header';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </>
  );
}

export default App;
