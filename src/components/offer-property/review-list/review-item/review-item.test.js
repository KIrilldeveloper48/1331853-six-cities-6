import React from 'react';
import {render, screen} from '@testing-library/react';

import ReviewItem from './review-item';

const testReviewItem = {
  "comment": `it couldn't be worse`,
  "date": `2019-05-08T14:13:56.569Z`,
  "id": 1,
  "rating": 4,
  "user": {
    "avatarUrl": `image/avatar.jpg`,
    "id": 4,
    "isPro": false,
    "name": ``
  }
};

it(`Render 'ReviewItem'`, () => {

  render(
      <ReviewItem review={testReviewItem} />
  );

  expect(screen.getByTestId(`review-1`)).toBeInTheDocument();
  expect(screen.getByAltText(`Reviews avatar`)).toHaveAttribute(`src`, `image/avatar.jpg`);
  expect(screen.getByTestId(`review-data`)).toHaveAttribute(`dateTime`, `2019-05-08`);
  expect(screen.getByText(`it couldn't be worse`)).toBeInTheDocument();
  expect(screen.getByText(`May 2019`)).toBeInTheDocument();

});
