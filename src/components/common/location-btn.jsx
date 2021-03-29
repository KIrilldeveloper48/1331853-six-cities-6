import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';

const LocationBtn = ({city}) => (
  <div className="locations__item" data-testid={`location-btn-${city}`}>
    <Link className="locations__item-link" to={Routes.MAIN}>
      <span>{city}</span>
    </Link>
  </div>
);

LocationBtn.propTypes = {
  city: PropTypes.string.isRequired
};

export default LocationBtn;
