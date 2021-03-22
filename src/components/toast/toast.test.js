import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';

import Toast from './toast';

const mockStore = configureStore();


it(`Render 'Toast'`, () => {

  render(
      <redux.Provider store={mockStore({USER: {errorMessage: `404`}})}>
        <Toast />
      </redux.Provider>
  );

  expect(screen.getByTestId(`toast`)).toBeInTheDocument();
  expect(screen.getByText(`Error 404 try later`)).toBeInTheDocument();

});