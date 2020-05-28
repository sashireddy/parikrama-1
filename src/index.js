import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';

Sentry.init({dsn: "https://200b7efebd53449db724bd0f86673d63@o399355.ingest.sentry.io/5256320"});
ReactDOM.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();