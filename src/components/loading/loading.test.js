import React from 'react';
import {render, screen} from '@testing-library/react';
import Loading from './loading';

it(`Render 'Loading'`, () => {

  render(
      <Loading />
  );

  expect(screen.getByTestId(`loading`)).toBeInTheDocument();
});

