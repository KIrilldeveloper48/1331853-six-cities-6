import React from 'react';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import LocationBtn from './location-btn';

it(`Render 'Location-btn'`, () => {

  const history = createMemoryHistory();

  render(
      <Router history={history}>
        <LocationBtn city="Paris" />
      </Router>
  );

  expect(screen.getByText(`Paris`)).toBeInTheDocument();
});
