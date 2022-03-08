import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProviderWrapper } from './context/auth.context';

ReactDOM.render(
    <AuthProviderWrapper>
    <Router>
      
            <App />
 
    </Router>
    </AuthProviderWrapper>,
  document.getElementById('root')
);


