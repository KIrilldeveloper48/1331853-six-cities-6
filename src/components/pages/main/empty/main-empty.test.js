import React from 'react';
import {render, screen} from '@testing-library/react';

import MainEmpty from './empty';

it(`Render 'MainEmpty'`, () => {

  render(
      <MainEmpty city="Paris"/>
  );

  expect(screen.getByTestId(`main-page-empty`)).toBeInTheDocument();
  expect(screen.getByText(`No places to stay available`)).toBeInTheDocument();
  expect(screen.getByText(`We could not find any property available at the moment in Paris`)).toBeInTheDocument();

});
