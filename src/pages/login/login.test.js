import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import userEvent from '@testing-library/user-event';

import Login from './login';

const mockStore = configureStore();

it(`Render 'Login' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  history.push(`/login`);

  render(
      <redux.Provider store={mockStore({MAIN: {city: `Paris`}, USER: {authorizationStatus: `NO_AUTH`, userName: `Kirill`, avatarUrl: `src/image`}})}>
        <Router history={history}>
          <Login />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`login-title`)).toBeInTheDocument();
  expect(screen.getByTestId(`login-submit`)).toBeInTheDocument();
  expect(screen.getByLabelText(`E-mail`)).toBeInTheDocument();
  expect(screen.getByLabelText(`Password`)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`login`), `Kirill`);
  userEvent.type(screen.getByTestId(`password`), `Popov`);

  expect(screen.getByDisplayValue(`Kirill`)).toBeInTheDocument();
  expect(screen.getByDisplayValue(`Popov`)).toBeInTheDocument();
});
