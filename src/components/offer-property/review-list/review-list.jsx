import React from 'react';

import {PropTypes} from 'prop-types';
import {reviewsPropValid} from './review-item/review-item.prop';

import ReviewItem from './review-item/review-item';


const ReviewList = ({reviews}) => {
  return (
    <ul className="reviews__list" data-testid="review-list">
      {
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      }
    </ul>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewsPropValid).isRequired).isRequired,
};

export default ReviewList;
