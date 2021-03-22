import React from 'react';
import {render, screen} from '@testing-library/react';

import ReviewList from './review-list';

const testReviewList = [
  {
    id: 1,
    user: {
      avatarUrl: `image/avatar.jpg`
    },
    rating: 4,
    comment: `it couldn't be worse`,
    data: `2019-05-08T14:13:56.569Z`
  },
  {
    id: 2,
    user: {
      avatarUrl: `image/avatar.jpg`
    },
    rating: 4,
    comment: `it couldn't be worse`,
    data: `2019-05-08T14:13:56.569Z`
  }
];

it(`Render 'ReviewList'`, () => {

  render(
      <ReviewList reviews={testReviewList} />
  );

  expect(screen.getByTestId(`review-list`)).toBeInTheDocument();
  expect(screen.getByTestId(`review-1`)).toBeInTheDocument();
  expect(screen.getByTestId(`review-2`)).toBeInTheDocument();

});
