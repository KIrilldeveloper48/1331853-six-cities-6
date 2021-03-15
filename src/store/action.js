import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  SET_ACTIVE_OFFER: `main/setActiveOffer`,
  REMOVE_ACTIVE_OFFER: `main/removeActiveOffer`,
  CHANGE_SORT: `main/changeSort`,
  LOAD_OFFERS: `data/loadOffers`,
  TOGGLE_FAVOR: `data/toggleFavor`,
  TOGGLE_OPENED_CARD_FAVOR: `data/toggleOpenedCardFavor`,
  SET_OPEN_OFFER: `data/setOpenOffer`,
  SET_NEARBY_OFFERS: `data/setNearbyOffers`,
  SET_CURRENT_REVIEWS: `data/setCurrentReviews`,
  SET_LOADING_REVIEW_STATUS: `data/setLoadingReviewStatus`,
  SET_FAVORITE_LIST: `data/setFavoriteList`,
  ADD_CARD_TO_FAVORITE_LIST: `data/addCardToFavoriteList`,
  REMOVE_CARD_FROM_FAVORITE_LIST: `data/removeCardFromFavoriteList`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  CHANGE_USER_NAME: `user/changeUserName`,
  CHANGE_USER_AVATAR: `user/changeUserAvatar`,
  REDIRECT_TO_ROUTE: `login/redirectToRoute`,
  SET_ERROR_MESSAGE: `user/setErrorMessage`
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => {
  return {
    payload: city
  };
});

export const setActiveOffer = createAction(ActionType.SET_ACTIVE_OFFER, (id) => {
  return {
    payload: id
  };
});

export const removeActiveOffer = createAction(ActionType.REMOVE_ACTIVE_OFFER);

export const changeSort = createAction(ActionType.CHANGE_SORT, (currentSort) => {
  return {
    payload: currentSort
  };
});

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => {
  return {
    payload: offers
  };
});

export const toggleFavor = createAction(ActionType.TOGGLE_FAVOR, (offerId) => {
  return {
    payload: offerId
  };
});

export const toggleOpenedCardFavor = createAction(ActionType.TOGGLE_OPENED_CARD_FAVOR);

export const setOpenOffer = createAction(ActionType.SET_OPEN_OFFER, (offer) => {
  return {
    payload: offer
  };
});

export const setNearbyOffers = createAction(ActionType.SET_NEARBY_OFFERS, (nearbyOffers) => {
  return {
    payload: nearbyOffers
  };
});

export const setCurrentReviews = createAction(ActionType.SET_CURRENT_REVIEWS, (currentReviews) => {
  return {
    payload: currentReviews
  };
});

export const setLoadingReviewStatus = createAction(ActionType.SET_LOADING_REVIEW_STATUS, (status) => {
  return {
    payload: status
  };
});

export const setFavoriteList = createAction(ActionType.SET_FAVORITE_LIST, (favoriteList) => {
  return {
    payload: favoriteList
  };
});

export const addCardToFavoriteList = createAction(ActionType.ADD_CARD_TO_FAVORITE_LIST, (newFavoriteOffer) => {
  return {
    payload: newFavoriteOffer
  };
});

export const removeCardFromFavoriteList = createAction(ActionType.REMOVE_CARD_FROM_FAVORITE_LIST, (id) => {
  return {
    payload: id
  };
});

export const requiredAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

export const changeUserName = createAction(ActionType.CHANGE_USER_NAME, (userName) => {
  return {
    payload: userName
  };
});

export const changeUserAvatar = createAction(ActionType.CHANGE_USER_AVATAR, (avatarUrl) => {
  return {
    payload: avatarUrl
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});

export const setErrorMessage = createAction(ActionType.SET_ERROR_MESSAGE, (message) => {
  return {
    payload: message
  };
});
