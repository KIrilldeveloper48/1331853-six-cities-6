import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import Page404 from './page-404';

const mockStore = configureStore();

it(`Render 'Page 404'`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore({USER: {authorizationStatus: `AUTH`, userName: `Kirill`, avatarUrl: `src/image`}})}>
        <Router history={history}>
          <Page404 />
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`page-404`)).toBeInTheDocument();
  expect(screen.getByTestId(`header`)).toBeInTheDocument();
  expect(screen.getByText(`404`)).toBeInTheDocument();
  expect(screen.getByText(`We are sorry, Page not found!`)).toBeInTheDocument();
  expect(screen.getByText(`The page you are looking for might have been removed had its name changed or is temporarily unavailable.`)).toBeInTheDocument();
  expect(screen.getByText(`Back To Homepage`)).toBeInTheDocument();

});
