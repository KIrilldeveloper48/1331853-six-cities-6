import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import Locations from './locations';
import {CITY_LIST} from '../../../const';


const mockStore = configureStore();

it(`Render 'Locations'`, () => {

  render(
      <redux.Provider store={mockStore({MAIN: {city: `Paris`}})}>
        <Locations />
      </redux.Provider>
  );

  for (const item of CITY_LIST) {
    expect(screen.getByText(item)).toBeInTheDocument();
  }
});
