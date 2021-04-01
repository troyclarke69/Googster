import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CoronaProvider } from './context/api';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <CoronaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CoronaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);