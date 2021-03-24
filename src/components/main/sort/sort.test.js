import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {render, screen} from '@testing-library/react';
import Sort from './sort';
import {SORT_LIST} from '../../../const';
import userEvent from '@testing-library/user-event';


const mockStore = configureStore();

describe(`Test 'Sort'`, () => {
  it(`'Sort' should be render correctly`, () => {
    const sortTypeForTest = `popular`;

    render(
        <redux.Provider store={mockStore({MAIN: {currentSort: sortTypeForTest}})}>
          <Sort />
        </redux.Provider>
    );

    const currentSortTypeElement = screen.getByTestId(`current-sort-type`);

    expect(screen.getByTestId(`sort`)).toBeInTheDocument();
    expect(screen.getByTestId(`current-sort-type`)).toContainHTML(`Popular`);

    expect(screen.getByText(`Sort by`)).toBeInTheDocument();
    expect(currentSortTypeElement).toBeInTheDocument();

    for (const item of SORT_LIST) {
      expect(screen.getByTestId(item.type)).toBeInTheDocument();
    }

    expect(screen.getByTestId(sortTypeForTest)).toHaveClass(`places__option--active`);
    expect(screen.getByTestId(`high-price`)).not.toHaveClass(`places__option--active`);
  });


  it(`Logic should be worked correctly`, () => {
    const fakeDispatch = jest.spyOn(redux, `useDispatch`);
    const sortTypeForTest = `popular`;

    render(
        <redux.Provider store={mockStore({MAIN: {currentSort: ``}})}>
          <Sort />
        </redux.Provider>
    );

    expect(screen.getByTestId(`sort`)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`current-sort-type`));
    expect(screen.getByTestId(`sort-select-list`)).toHaveClass(`places__options--opened`);

    userEvent.click(screen.getByTestId(`popular`));
    expect(fakeDispatch).toBeCalled();
    expect(screen.getByTestId(`sort-select-list`)).not.toHaveClass(`places__options--opened`);
  });
});


