import React from 'react';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import Footer from './footer';

it(`Render 'Footer'`, () => {
  const history = createMemoryHistory();

  render(
      <Router history={history}>
        <Footer />
      </Router>
  );

  expect(screen.getByTestId(`footer-logo`)).toBeInTheDocument();
});
