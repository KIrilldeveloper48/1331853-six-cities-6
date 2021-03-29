import React from 'react';
import {PropTypes} from 'prop-types';

const Bookmark = ({onCardFavorClick, isFavorite, id}) => {
  const isCardFavorite = isFavorite ? `property__bookmark-button--active` : ``;

  return (
    <button className={`property__bookmark-button ${isCardFavorite} button`} type="button" onClick={()=> onCardFavorClick(id, isFavorite)} data-testid="offer-property-bookmark">
      <svg className="property__bookmark-icon" width={31} height={33}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

Bookmark.propTypes = {
  onCardFavorClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};

export default Bookmark;
