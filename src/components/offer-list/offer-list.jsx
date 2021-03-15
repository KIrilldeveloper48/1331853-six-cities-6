import React from 'react';
import {PropTypes} from 'prop-types';
import {offersPropValid} from './offer-card/offer-card.prop';

import OfferCard from './offer-card/offer-card';

const OfferList = ({offers, mode}) => (
  offers.map((offer) => <OfferCard key={offer.id} {...offer} mode={mode}/>)
);

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offersPropValid).isRequired).isRequired,
  mode: PropTypes.string.isRequired
};


export default React.memo(OfferList);


