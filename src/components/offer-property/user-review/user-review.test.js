import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserReview from './user-review';

const mockStore = configureStore();


it(`Render 'UserReview'`, () => {

  render(
      <redux.Provider store={mockStore({DATA: {openedOffer: {id: ``}, reviewLoadingStatus: ``}})}>
        <UserReview />
      </redux.Provider>
  );

  expect(screen.getByTestId(`user-review`)).toBeInTheDocument();
  expect(screen.getByTestId(`user-review-help`)).toBeInTheDocument();
  expect(screen.getByText(`Your review`)).toBeInTheDocument();
  expect(screen.getByText(`Submit`)).toBeInTheDocument();
  userEvent.type(screen.getByTestId(`user-review-input`), `Kirill`);
  expect(screen.getByDisplayValue(`Kirill`)).toBeInTheDocument();

});
