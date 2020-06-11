import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import Entry from './app/Entry'
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Firebase,{FirebaseContext} from './app/Firebase'
import store from './app/store'

Sentry.init({dsn: "https://200b7efebd53449db724bd0f86673d63@o399355.ingest.sentry.io/5256320"});
ReactDOM.render(
  <Provider store={store}>
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter basename="/">
      <Entry />
    </BrowserRouter>
  </FirebaseContext.Provider>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();