import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import FavoriteItem from './favorite-item';
import userEvent from '@testing-library/user-event';


const mockStore = configureStore();

describe(`Test 'FavoriteItem'`, () => {
  it(`'FavoriteItem' should be render correctly`, () => {
    const history = createMemoryHistory();

    const testData = {
      DATA: {
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
      }
    };

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <FavoriteItem city="Paris" cardClickCallback={() => {}}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorite-item-Paris`)).toBeInTheDocument();
    expect(screen.getByTestId(`location-btn-Paris`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
  });

  it(`Logic should worked correctly`, () => {
    const history = createMemoryHistory();

    const testData = {
      DATA: {
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
          }
        ]
      }
    };
    const fakeCallback = jest.fn();

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <FavoriteItem city="Paris" cardClickCallback={fakeCallback}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorite-item-Paris`)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(`favorite-item-Paris`));
    expect(fakeCallback).toBeCalled();

  });
});


