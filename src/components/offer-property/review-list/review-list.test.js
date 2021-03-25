import React from 'react';
import {render, screen} from '@testing-library/react';

import ReviewList from './review-list';

const testReviewList = [
  {
    "comment": ``,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 1,
    "rating": 4,
    "user": {
      "avatarUrl": ``,
      "id": 4,
      "isPro": false,
      "name": ``
    }
  },
  {
    "comment": ``,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 2,
    "rating": 4,
    "user": {
      "avatarUrl": ``,
      "id": 4,
      "isPro": false,
      "name": ``
    }
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
