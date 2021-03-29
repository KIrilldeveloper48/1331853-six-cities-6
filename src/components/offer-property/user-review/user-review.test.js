import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserReview from './user-review';

const mockStore = configureStore();

describe(`Test 'UserReview'`, () => {
  it(`'UserReview' should be render correctly`, () => {

    render(
        <redux.Provider store={mockStore({DATA: {openedOffer: {id: ``}, reviewLoadingStatus: ``}})}>
          <UserReview onFormSubmit={() => {}}/>
        </redux.Provider>
    );

    expect(screen.getByTestId(`user-review`)).toBeInTheDocument();
    expect(screen.getByTestId(`user-review-help`)).toBeInTheDocument();
    expect(screen.getByTestId(`star-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`star-2`)).toBeInTheDocument();
    expect(screen.getByText(`Your review`)).toBeInTheDocument();
    expect(screen.getByText(`Submit`)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(`user-review-input`), `Kirill`);
    expect(screen.getByDisplayValue(`Kirill`)).toBeInTheDocument();

  });

  it(`The form don't be posted if submit button is disabled`, () => {
    const fakeCallback = jest.fn();

    render(
        <redux.Provider store={mockStore({DATA: {openedOffer: {id: ``}, reviewLoadingStatus: ``}})}>
          <UserReview onFormSubmit={fakeCallback}/>
        </redux.Provider>
    );

    expect(screen.getByTestId(`user-review`)).toBeInTheDocument();


    userEvent.click(screen.getByTestId(`submit-button`));
    expect(fakeCallback).not.toBeCalled();

  });

  it(`The form should be posted if submit button is enabled`, () => {
    const fakeCallback = jest.fn((evt) => evt.preventDefault());

    render(
        <redux.Provider store={mockStore({DATA: {openedOffer: {id: ``}, reviewLoadingStatus: ``}})}>
          <UserReview onFormSubmit={fakeCallback}/>
        </redux.Provider>
    );

    expect(screen.getByTestId(`user-review`)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`star-1`));
    userEvent.type(screen.getByTestId(`user-review-input`), `Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus minus, quaerat voluptate earum sit reprehenderit laudantium aperiam quidem ex nulla!`);

    userEvent.click(screen.getByTestId(`submit-button`));
    expect(fakeCallback).toBeCalled();

  });
});


