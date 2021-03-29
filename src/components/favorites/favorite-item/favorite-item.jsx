import React from 'react';
import {PropTypes} from 'prop-types';
import LocationBtn from '../../common/location-btn';
import OfferList from '../../offer-list/offer-list';
import {getCurrentOffers} from '../../../utils';
import {useSelector} from 'react-redux';

const FavoriteItem = ({city, cardClickCallback}) => {
  const {favoriteList} = useSelector((state) => state.DATA);
  const cardClickHandler = cardClickCallback;

  return (
    <li className="favorites__locations-items" onClick={() => cardClickHandler(city)} data-testid={`favorite-item-${city}`}>

      <div className="favorites__locations locations locations--current">
        <LocationBtn city={city}/>
      </div>

      <div className="favorites__places">
        <OfferList offers={getCurrentOffers(city, favoriteList)} mode="FAVOR"/>
      </div>

    </li>
  );
};

FavoriteItem.propTypes = {
  city: PropTypes.string.isRequired,
  cardClickCallback: PropTypes.func.isRequired
};

export default FavoriteItem;
