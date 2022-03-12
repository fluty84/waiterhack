import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context';
import './index.css';

ReactDOM.render(
    <AuthProviderWrapper>
    <Router>
  
            <App />
 
    </Router>
    </AuthProviderWrapper>,
  document.getElementById('root')
);


