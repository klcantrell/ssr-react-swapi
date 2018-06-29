import 'whatwg-fetch';
import 'core-js/es6/promise';
import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';

render(
  <App />,
  document.getElementById('app')
);