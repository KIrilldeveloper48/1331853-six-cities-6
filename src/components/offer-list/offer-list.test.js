import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import OfferList from './offer-list';

const mockStore = configureStore();
const testOfferList = [{
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
    "id": 3,
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
}];

it(`'OfferList' should be render correctly`, () => {
  const history = createMemoryHistory();

  render(
      <redux.Provider store={mockStore({})}>
        <Router history={history}>
          <OfferList mode="MAIN" offers={testOfferList}/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
  expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
});
