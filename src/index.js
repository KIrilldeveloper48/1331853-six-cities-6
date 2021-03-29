import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

import App from './components/app/app';
import rootReducer from './store/root-reducer';
import {createApi} from './services/api';
import {requiredAuthorization} from './store/action';
import {AuthorizationStatus} from './const';
import {checkAuth} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from './browser-history';


const api = createApi(
    () =>
      store.dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});


store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>,


    document.querySelector(`#root`)
);
