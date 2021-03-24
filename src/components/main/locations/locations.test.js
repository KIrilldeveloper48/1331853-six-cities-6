import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import Locations from './locations';
import {CITY_LIST} from '../../../const';
import userEvent from '@testing-library/user-event';


const mockStore = configureStore();

describe(`Test 'Locations'`, () => {
  it(`'Locations' should be render correctly`, () => {
    const testCity = `Paris`;

    render(
        <redux.Provider store={mockStore({MAIN: {city: testCity}})}>
          <Locations />
        </redux.Provider>
    );

    expect(screen.getByTestId(`locations`)).toBeInTheDocument();

    for (const item of CITY_LIST) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.getByTestId(`locations-link-${testCity}`)).toHaveClass(`tabs__item--active`);

  });

  it(`Dispatch fn should be called on click (link)`, () => {
    const fakeDispatch = jest.spyOn(redux, `useDispatch`);

    render(
        <redux.Provider store={mockStore({MAIN: {city: ``}})}>
          <Locations />
        </redux.Provider>
    );

    expect(screen.getByTestId(`locations`)).toBeInTheDocument();

    for (const item of CITY_LIST) {
      userEvent.click(screen.getByText(item));
      expect(fakeDispatch).toBeCalled();
    }

  });
});


