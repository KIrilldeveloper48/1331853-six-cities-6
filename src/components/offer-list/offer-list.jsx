import React from 'react';
import {PropTypes} from 'prop-types';
import {offersPropValid} from './offer-card/offer-card.prop';

import OfferCard from './offer-card/offer-card';
import {useDispatch} from 'react-redux';
import {toggleFavorOnServer} from '../../store/api-actions';
import {removeActiveOffer, setActiveOffer} from '../../store/action';

const OfferList = ({offers, mode}) => {
  const dispatch = useDispatch();

  const cardFavorClickHandler = (cardId, status) => {
    const newStatus = Number(!status);
    dispatch(toggleFavorOnServer(cardId, newStatus));
  };

  const cardMouseOverHandler = (cardId) => {
    if (mode !== `OFFER`) {
      dispatch(setActiveOffer(cardId));
    }
  };

  const cardMouseLeaveHandler = () => {
    if (mode !== `OFFER`) {
      dispatch(removeActiveOffer());
    }
  };

  return (
    offers.map((offer) => <OfferCard key={offer.id} {...offer} mode={mode} onCardFavorClick={cardFavorClickHandler} onCardMouseLeave={cardMouseLeaveHandler} onCardMouseOver={cardMouseOverHandler}/>)
  );
};

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offersPropValid).isRequired).isRequired,
  mode: PropTypes.string.isRequired
};


export default React.memo(OfferList);


