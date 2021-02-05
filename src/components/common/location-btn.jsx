import React from 'react';
import PropTypes from 'prop-types';

const LocationBtn = (props) => {
  return (
    <div className="locations__item">
      <a className="locations__item-link" href="#">
        <span>{props.location}</span>
      </a>
    </div>
  );
};


LocationBtn.propTypes = {
  location: PropTypes.string.isRequired
};

export default LocationBtn;
