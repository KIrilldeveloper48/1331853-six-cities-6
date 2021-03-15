import {createReducer} from '@reduxjs/toolkit';
import {loadOffers, setCurrentReviews, setFavoriteList, setLoadingReviewStatus, setNearbyOffers, setOpenOffer, toggleFavor, toggleOpenedCardFavor, addCardToFavoriteList, removeCardFromFavoriteList} from "../action";

const getItemIndex = (list, id) => {
  const idList = list.map((item) => item.id);
  return idList.indexOf(id);
};

const toggleCardFavor = (offer, currentOfferList) => {
  const cardIndex = getItemIndex(currentOfferList, offer.id);
  return cardIndex !== -1
    ? [...currentOfferList.slice(0, cardIndex), offer, ...currentOfferList.slice((cardIndex + 1), currentOfferList.length)]
    : currentOfferList;
};

const getFavoriteListWithNewCard = (newFavoriteOffer, currentFavoriteList) => {
  return [...currentFavoriteList, newFavoriteOffer];
};


const getFavoriteListWithoutCard = (offerId, currentFavoriteList) => {
  const cardIndex = getItemIndex(currentFavoriteList, offerId);
  return (
    [...currentFavoriteList.slice(0, cardIndex), ...currentFavoriteList.slice((cardIndex + 1), currentFavoriteList.length)]
  );
};

const initialState = {
  offers: [],
  isDataLoaded: false,
  openedOffer: {},
  nearbyOffers: [],
  currentReviews: false,
  reviewLoadingStatus: ``,
  favoriteList: [],
  isFavoriteListLoaded: false,
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(toggleFavor, (state, action) => {
    state.offers = toggleCardFavor(action.payload, state.offers);
    state.nearbyOffers = toggleCardFavor(action.payload, state.nearbyOffers);
  });

  builder.addCase(toggleOpenedCardFavor, (state) => {
    state.openedOffer = Object.assign({}, state.openedOffer, {isFavorite: !state.openedOffer.isFavorite});
  });

  builder.addCase(setOpenOffer, (state, action) => {
    state.openedOffer = action.payload;
  });

  builder.addCase(setNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload;
  });

  builder.addCase(setCurrentReviews, (state, action) => {
    state.currentReviews = action.payload;
  });

  builder.addCase(setLoadingReviewStatus, (state, action) => {
    state.reviewLoadingStatus = action.payload;
  });

  builder.addCase(setFavoriteList, (state, action) => {
    state.favoriteList = action.payload;
    state.isFavoriteListLoaded = true;
  });

  builder.addCase(addCardToFavoriteList, (state, action) => {
    state.favoriteList = getFavoriteListWithNewCard(action.payload, state.favoriteList);
  });

  builder.addCase(removeCardFromFavoriteList, (state, action) => {
    state.favoriteList = getFavoriteListWithoutCard(action.payload, state.favoriteList);
  });
});

export {data};
