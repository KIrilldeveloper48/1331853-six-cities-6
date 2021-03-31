import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';

import Main from './main';

const mockStore = configureStore();

const testDataWithFilledOfferList = {
  USER: {
    authorizationStatus: ``,
    userName: ``,
    avatarUrl: ``,
    errorMessage: ``
  },
  MAIN: {
    city: `Paris`,
    currentSort: `Popular`,
    activeOffer: false,
  },
  DATA: {
    isDataLoaded: true,
    openedOffer: {},
    offers: [
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 1,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 2,
          "isPro": false,
          "name": ``
        },
        "id": 2,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Amsterdam`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 3,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      }
    ]
  }
};

const testDataWithEmptyOfferList = {
  USER: {
    authorizationStatus: ``,
    userName: ``,
    avatarUrl: ``,
    errorMessage: ``
  },
  MAIN: {
    city: `Paris`,
    currentSort: `Popular`,
    activeOffer: false,
  },
  DATA: {
    isDataLoaded: true,
    openedOffer: {},
    offers: []
  }
};

describe(`Should render main page correctly with filled and empty offer list`, () => {
  it(`Render 'Main' page with filled offer list`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore(testDataWithFilledOfferList)}>
          <Router history={history}>
            <Main />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`main-page`)).toBeInTheDocument();
    expect(screen.getByTestId(`toast`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByTestId(`main-page-main-tag`)).not.toHaveClass(`page__main--index-empty`);
    expect(screen.getByTestId(`sort`)).toBeInTheDocument();
    expect(screen.getByTestId(`locations`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
    expect(screen.getByTestId(`map`)).toBeInTheDocument();

    expect(screen.getByText(`Cities`)).toBeInTheDocument();
    expect(screen.getByText(`Places`)).toBeInTheDocument();
    expect(screen.getByText(`2 places to stay in Paris`)).toBeInTheDocument();

  });

  it(`Render 'Main' page with empty offer list`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore(testDataWithEmptyOfferList)}>
          <Router history={history}>
            <Main />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByTestId(`toast`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByTestId(`locations`)).toBeInTheDocument();

    expect(screen.getByTestId(`main-page-empty`)).toBeInTheDocument();

  });

});


