import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import Map from './map';


const mockStore = configureStore();
const offerTest = [{
  "title": `Beautiful & luxurious studio at great location`,
  "id": 1,
  "city": {
    "location": {
      "latitude": 52.370216,
      "longitude": 4.895168,
    },
  },
  "location": {
    "latitude": 52.35514938496378,
    "longitude": 4.673877537499948,
  },
}];

it(`Render 'Map'`, () => {

  render(
      <redux.Provider store={mockStore({MAIN: {activeOffer: {id: 1}}, DATA: {openedOffer: {id: 2}}})}>
        <Map offers={offerTest} mode="MAIN" city="Paris"/>
      </redux.Provider>
  );

  expect(screen.getByTestId(`map`)).toBeInTheDocument();

});
