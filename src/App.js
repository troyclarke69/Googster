import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Error from './pages/Error';
import Splash from './pages/Splash';
import Earth from './pages/Earth';
import Home from './pages/Home';
import Stats from './pages/Stats';

function App() {

  return(
    <>
    <div className='App'>
      <Switch>
        <Route exact path="/" component={Splash}/>
        <Route exact path="/Home" component={Home}/>
        <Route exact path="/Stats" component={Stats}/>
        <Route exact path="/earth" component={Earth}/>
        <Route component={Error}/>
      </Switch>
    </div>
    </>
  );
}
export default App;