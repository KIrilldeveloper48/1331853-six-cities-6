import React from 'react';
import {render, screen} from '@testing-library/react';

import Gallery from './gallery';
const testImageList = [
  `image/image-1.jpg`,
  `image/image-2.jpg`,
];
it(`Render 'Gallery'`, () => {

  render(
      <Gallery images={testImageList}/>
  );

  expect(screen.getByTestId(`gallery`)).toBeInTheDocument();

  expect(screen.getByTestId(`gallery-image-1`)).toHaveAttribute(`src`, `image/image-1.jpg`);
  expect(screen.getByTestId(`gallery-image-2`)).toHaveAttribute(`src`, `image/image-2.jpg`);

});
