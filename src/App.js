import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Error from './pages/Error';
import Splash from './pages/Splash';
import Earth from './pages/Earth';

function App() {

  return(
    <div className='App'>
      <Switch>
        <Route exact path="/" component={Splash}/>
        {/* <Route exact path="/countries/:id" component={Countries}/> */}
        <Route exact path="/earth" component={Earth}/>
        <Route component={Error}/>
      </Switch>
    </div>
  );
}
export default App;