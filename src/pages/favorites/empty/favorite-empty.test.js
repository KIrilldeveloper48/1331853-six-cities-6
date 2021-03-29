import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';

import FavoritesEmpty from './empty';

const mockStore = configureStore();

const testData = {
  USER: {
    authorizationStatus: ``,
    userName: ``,
    avatarUrl: ``,
  }
};

it(`Render 'FavoritesEmpty'`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore(testData)}>
        <Router history={history}>
          <FavoritesEmpty />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`favorite-empty`)).toBeInTheDocument();
  expect(screen.getByTestId(`header`)).toBeInTheDocument();
  expect(screen.getByTestId(`footer`)).toBeInTheDocument();
  expect(screen.getByText(`Favorites (empty)`)).toBeInTheDocument();
  expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  expect(screen.getByText(`Save properties to narrow down search or plan your future trips.`)).toBeInTheDocument();
});


