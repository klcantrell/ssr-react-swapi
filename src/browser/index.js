import 'whatwg-fetch';
import 'core-js/es6/promise';
import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/App';

const initialData = window.__INITIAL_DATA__;

hydrate(
  <App data={initialData} />,
  document.getElementById('app')
);