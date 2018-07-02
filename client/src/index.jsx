import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import './reset.scss';

ReactDOM.render((
  <Router >
    <App />
  </Router >
), document.getElementById('react-root'));
