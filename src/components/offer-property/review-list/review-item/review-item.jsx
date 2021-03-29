import React from 'react';
import dayjs from 'dayjs';

import {PropTypes} from 'prop-types';
import {reviewsPropValid} from './review-item.prop';

import {getRatingCount} from '../../../../utils';


const ReviewItem = ({review}) => {
  const {user: {avatarUrl}, rating, comment, date} = review;
  return (
    <li className="reviews__item" data-testid={`review-${review.id}`}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} alt="Reviews avatar" width={54} height={54} />
        </div>
        <span className="reviews__user-name">
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingCount(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dayjs(date).format(`YYYY-MM-DD`)} data-testid="review-data">{dayjs(date).format(`MMMM YYYY`)}</time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape(reviewsPropValid).isRequired
};

export default ReviewItem;
