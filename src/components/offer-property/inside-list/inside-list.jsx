import React from 'react';
import {PropTypes} from 'prop-types';

const InsideList = ({goods}) => (
  <ul className="property__inside-list" data-testid="inside-list">
    {
      goods.map((good) => (
        <li key={good} className="property__inside-item">
          {good}
        </li>
      ))
    }
  </ul>
);

InsideList.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default InsideList;
