import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import OfferList from '../offer-list';

const mockStore = configureStore();
const testOfferList = [{
  id: 1,
  previewImage: `img/1.png`,
  price: 120,
  type: `apartment`,
  rating: 3,
  isPremium: true,
  title: `bad room`,
  isFavorite: true,
},
{
  id: 2,
  previewImage: `img/2.png`,
  price: 100,
  type: `apartment`,
  rating: 2,
  isPremium: false,
  title: `beautiful apartment`,
  isFavorite: false,
}];

it(`Render 'OfferList'`, () => {
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
