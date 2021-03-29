import React from 'react';
import {render, screen} from '@testing-library/react';
import Star from './star';

it(`'Star' should be render correctly`, () => {

  render(
      <Star digit={1} title={``} isDisabled={false}/>
  );

  expect(screen.getByTestId(`star-1`)).toBeInTheDocument();
});


