import React from 'react';
import PropTypes from 'prop-types';

const Star = ({digit, title, isDisabled}) => (
  <>
    <input className="form__rating-input visually-hidden" name="rating" defaultValue={digit} id={digit + `-stars`} type="radio" required disabled={isDisabled} data-testid={`star-${digit}`}/>
    <label htmlFor={digit + `-stars`} className="reviews__rating-label form__rating-label" title={title}>
      <svg className="form__star-image" width={37} height={33}>
        <use xlinkHref="#icon-star" />
      </svg>
    </label>
  </>
);

Star.propTypes = {
  digit: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};
export default Star;
