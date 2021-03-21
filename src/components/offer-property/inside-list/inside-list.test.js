import React from 'react';
import {render, screen} from '@testing-library/react';

import InsideList from './inside-list';

const testGoods = [`TV`, `Guitar`, `Walls`, `Two doors`];

it(`Render 'InsideList'`, () => {

  render(
      <InsideList goods={testGoods} />
  );

  expect(screen.getByTestId(`inside-list`)).toBeInTheDocument();

  for (const item of testGoods) {
    expect(screen.getByText(item)).toBeInTheDocument();
  }

});
