import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../../pages/main/main';
import OfferProperty from '../../pages/offer-property/offer-property';
import Favorites from '../../pages/favorites/favorites';
import Page404 from '../../pages/page-404/page-404';
import Login from '../../pages/login/login';
import PrivateRoute from '../private-route/private-route';

import {Routes} from './../../const';


const {MAIN: pathMain, OFFER: pathOffer, LOGIN: pathLogin, FAVOR: pathFavor} = Routes;

const App = () => {

  return (
    <Switch>

      <Route exact path={pathMain}>
        <Main />
      </Route>

      <Route exact path={pathOffer}>
        <OfferProperty/>
      </Route>

      <PrivateRoute exact
        path={pathLogin}
        render={()=> <Login />}>
      </PrivateRoute>

      <PrivateRoute exact
        path={pathFavor}
        render={() => <Favorites />}>
      </PrivateRoute>

      <Route>
        <Page404 />
      </Route>

    </Switch>
  );
};


export default App;
