import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import Map from './map';


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
}];

it(`'Map' should be render correctly`, () => {

  render(
      <redux.Provider store={mockStore({MAIN: {activeOffer: {id: 1}}, DATA: {openedOffer: {id: 2}}})}>
        <Map offers={testOfferList} mode="MAIN" city="Paris"/>
      </redux.Provider>
  );

  expect(screen.getByTestId(`map`)).toBeInTheDocument();

});
