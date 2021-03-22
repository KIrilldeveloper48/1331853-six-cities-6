import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import Favorites from './favorites';


const mockStore = configureStore();
const testDataWithFilledFavoriteList = {
  DATA: {
    isFavoriteListLoaded: true,
    favoriteList: [
      {
        id: 1,
        city: {
          name: `Paris`
        },
        previewImage: `img/1.png`,
        price: 120,
        type: `apartment`,
        rating: 3,
        isPremium: true,
        title: `bad room`,
        isFavorite: true
      },
      {
        id: 2,
        city: {
          name: `Amsterdam`
        },
        previewImage: `img/1.png`,
        price: 120,
        type: `apartment`,
        rating: 3,
        isPremium: false,
        title: `bad room`,
        isFavorite: true
      }
    ]
  },
  USER: {
    authorizationStatus: `AUTH`,
    userName: `Kirill`,
    avatarUrl: `image/avatar.jpg`,
    errorMessage: ``
  }
};

const testDataWithEmptyFavoriteList = {
  DATA: {
    isFavoriteListLoaded: true,
    favoriteList: []
  },
  USER: {
    authorizationStatus: `AUTH`,
    userName: `Kirill`,
    avatarUrl: `image/avatar.jpg`,
    errorMessage: ``
  }
};
describe(`Should render 'Favorite' page correctly with filled or empty favorite list `, () => {
  it(`Render 'Favorites' with filled favorite list`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore(testDataWithFilledFavoriteList)}>
          <Router history={history}>
            <Favorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`toast`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByTestId(`location-btn-Paris`)).toBeInTheDocument();
    expect(screen.getByTestId(`location-btn-Amsterdam`)).toBeInTheDocument();
    expect(screen.getByTestId(`footer`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();

  });

  it(`Render 'Favorites' with empty favorite list`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore(testDataWithEmptyFavoriteList)}>
          <Router history={history}>
            <Favorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorite-empty`)).toBeInTheDocument();

  });
});


