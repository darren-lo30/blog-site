import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import './assets/styles.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL!;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
