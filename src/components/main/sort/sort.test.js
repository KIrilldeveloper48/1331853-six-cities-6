import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import userEvent from '@testing-library/user-event';
import Sort from './sort';
import {SORT_LIST} from '../../../const';


const mockStore = configureStore();

it(`Render 'Sort'`, () => {
  const sortTypeForTest = `popular`;

  render(
      <redux.Provider store={mockStore({MAIN: {currentSort: sortTypeForTest}})}>
        <Sort />
      </redux.Provider>
  );

  const currentSortTypeElement = screen.getByTestId(`current-sort-type`);

  expect(screen.getByText(`Sort by`)).toBeInTheDocument();
  expect(currentSortTypeElement).toBeInTheDocument();
  expect(screen.getByTestId(`current-sort-type`)).toContainHTML(`Popular`);

  for (const item of SORT_LIST) {
    expect(screen.getByTestId(item.type)).toBeInTheDocument();
  }

});
