import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Error from './pages/Error';
import Splash from './pages/Splash';
import Earth from './pages/Earth';
import Home from './pages/Home';
import Stats from './pages/Stats';

function App() {

  // just a test ...
  // const [counter, setCounter] = useState(0);
  // const add = () => {
  //   // NOTE: counter++ does not work here == receive 'assignment to constant variable'
  //   setCounter(counter + 1);
  // }


  return(

    // <div className='App dark'>
    <>
    <div className='App'>
      {/* <button onClick={() => setCounter(counter + 1)}>Add</button> */}
      {/* <button onClick={() => add()}>Add</button> */}
      {/* <h2>{counter}</h2> */}

      <Switch>
        <Route exact path="/" component={Splash}/>
        <Route exact path="/Home" component={Home}/>
        <Route exact path="/Stats" component={Stats}/>
        {/* <Route exact path="/countries/:id" component={Countries}/> */}
        <Route exact path="/earth" component={Earth}/>
        <Route component={Error}/>
      </Switch>
    </div>
    </>
  );
}
export default App;