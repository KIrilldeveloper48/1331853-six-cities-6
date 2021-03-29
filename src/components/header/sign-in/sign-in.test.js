import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import SignIn from './sign-in';

const mockStore = configureStore();

describe(`Should render 'SignIn' correctly with different parameters`, () => {
  it(`Render 'SignIn'`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore({USER: {authorizationStatus: ``, userName: ``, avatarUrl: ``}})}>
          <Router history={history}>
            <SignIn />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`sign-in`)).toBeInTheDocument();
    expect(screen.getByTestId(`user-avatar`)).toBeInTheDocument();
  });

  it(`Render 'SignIn' then authorization status is 'NO_AUTH'`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore({USER: {authorizationStatus: `NO_AUTH`, userName: ``, avatarUrl: ``}})}>
          <Router history={history}>
            <SignIn />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`sign-in`)).toBeInTheDocument();
    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
  });

  it(`Render 'SignIn' then authorization status is 'AUTH'`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore({USER: {authorizationStatus: `AUTH`, userName: `Kirill`, avatarUrl: ``}})}>
          <Router history={history}>
            <SignIn />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`sign-in`)).toBeInTheDocument();
    expect(screen.getByText(`Kirill`)).toBeInTheDocument();
  });
});


