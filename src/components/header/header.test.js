import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import Header from './header';

const mockStore = configureStore();

it(`Render 'Header'`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore({USER: {authorizationStatus: `NO_AUTH`, userName: `Kirill`, avatarUrl: `src/image`}})}>
        <Router history={history}>
          <Header />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`header-logo`)).toBeInTheDocument();
  expect(screen.getByTestId(`header-nav`)).toBeInTheDocument();
});
