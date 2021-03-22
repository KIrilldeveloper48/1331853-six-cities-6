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
    authorizationStatus: `AUTH`,
    userName: `Kirill`,
    avatarUrl: `image/avatar.jpg`,
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
        id: 1,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
          },
          name: `Paris`
        },
        previewImage: `img/1.png`,
        price: 120,
        type: `apartment`,
        rating: 3,
        isPremium: true,
        title: `bad room`,
        isFavorite: true,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
        }
      },
      {
        id: 2,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
          },
          name: `Paris`
        },
        previewImage: `img/1.png`,
        price: 120,
        type: `apartment`,
        rating: 3,
        isPremium: true,
        title: `bad room`,
        isFavorite: true,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
        }
      },
      {
        id: 3,
        city: {
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
          },
          name: `Amsterdam`
        },
        previewImage: `img/1.png`,
        price: 120,
        type: `apartment`,
        rating: 3,
        isPremium: true,
        title: `bad room`,
        isFavorite: true,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
        }
      }
    ]
  }
};

const testDataWithEmptyOfferList = {
  USER: {
    authorizationStatus: `AUTH`,
    userName: `Kirill`,
    avatarUrl: `image/avatar.jpg`,
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

    expect(screen.getByTestId(`main-page-empty`)).toBeInTheDocument();

  });

});


