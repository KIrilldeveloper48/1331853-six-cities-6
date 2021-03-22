import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import IsLogined from './is-logined';

const mockStore = configureStore();

it(`Render 'IsLogined'`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore({USER: {authorizationStatus: `NO_AUTH`, userName: `Kirill`, avatarUrl: `src/image`}})}>
        <Router history={history}>
          <IsLogined />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`user-avatar`)).toBeInTheDocument();
  expect(screen.getByText(`Sign in`)).toBeInTheDocument();
});
