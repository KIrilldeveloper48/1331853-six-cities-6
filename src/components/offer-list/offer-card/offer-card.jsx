import React from 'react';
import {Link} from 'react-router-dom';

import {PropTypes} from 'prop-types';
import {offersPropValid} from './offer-card.prop';

import {getOfferPath, getRatingCount} from '../../../utils';
import {CARD_CLASS_NAME} from '../../../const';
import {removeActiveOffer, setActiveOffer} from '../../../store/action';
import {useDispatch} from 'react-redux';
import {toggleFavorOnServer} from '../../../store/api-actions';

const OfferCard = ({id, previewImage, price, type, rating, isPremium, title, isFavorite, mode}) => {
  const dispatch = useDispatch();
  const isCardPremium = isPremium && <div className="place-card__mark"><span>Premium</span></div>;
  const isCardFavorite = isFavorite ? `place-card__bookmark-button--active` : ``;

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

  const cardFavorClickHandler = (cardId, status) => {
    const newStatus = Number(!status);
    dispatch(toggleFavorOnServer(cardId, newStatus));
  };

  return (
    <article className={`${CARD_CLASS_NAME[mode].article} place-card`} onMouseOver={() => cardMouseOverHandler(id)} onMouseLeave={() => cardMouseLeaveHandler()} data-testid={`card-${id}`}>
      {isCardPremium}
      <div className={`${CARD_CLASS_NAME[mode].image} place-card__image-wrapper`} data-testid={`card-${id}-image`}>
        <Link to={getOfferPath(id)}>
          <img className="place-card__image" src={previewImage} alt="Place image" width={260} height={200} />
        </Link>
      </div>
      <div className={`${CARD_CLASS_NAME[mode].info ? CARD_CLASS_NAME[mode].info : ``} place-card__info`} data-testid={`card-${id}-info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isCardFavorite}`} type="button" onClick={() => cardFavorClickHandler(id, isFavorite)} data-testid={`card-${id}-bookmark`}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingCount(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferPath(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};


OfferCard.propTypes = {
  ...offersPropValid,
  mode: PropTypes.string.isRequired,
};


export default React.memo(OfferCard);
