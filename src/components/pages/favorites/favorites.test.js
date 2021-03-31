import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import Favorites from './favorites';


const mockStore = configureStore();

describe(`Should render 'Favorite' page correctly with filled or empty favorite list `, () => {
  it(`Render 'Favorites' with filled favorite list`, () => {
    const history = createMemoryHistory();

    const testData = {
      DATA: {
        isFavoriteListLoaded: true,
        favoriteList: [
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
            "isFavorite": true,
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
              "id": 2,
              "isPro": false,
              "name": ``
            },
            "id": 2,
            "images": [``, ``],
            "isFavorite": true,
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
        ]
      },
      USER: {
        authorizationStatus: ``,
        userName: ``,
        avatarUrl: ``,
        errorMessage: ``
      }
    };

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <Favorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorites`)).toBeInTheDocument();
    expect(screen.getByTestId(`toast`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();

    expect(screen.getByTestId(`footer`)).toBeInTheDocument();
    expect(screen.getByTestId(`favorite-item-Paris`)).toBeInTheDocument();
    expect(screen.getByTestId(`favorite-item-Amsterdam`)).toBeInTheDocument();
    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();

  });

  it(`Render 'Favorites' with empty favorite list`, () => {
    const history = createMemoryHistory();

    const testData = {
      DATA: {
        isFavoriteListLoaded: true,
        favoriteList: []
      },
      USER: {
        authorizationStatus: ``,
        userName: ``,
        avatarUrl: ``,
        errorMessage: ``
      }
    };

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <Favorites />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorite-empty`)).toBeInTheDocument();

  });
});


