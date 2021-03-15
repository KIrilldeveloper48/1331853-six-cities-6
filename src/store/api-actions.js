import {addCardToFavoriteList, changeUserAvatar, changeUserName, loadOffers, redirectToRoute, removeCardFromFavoriteList, requiredAuthorization, setCurrentReviews, setErrorMessage, setFavoriteList, setLoadingReviewStatus, setNearbyOffers, setOpenOffer, toggleFavor} from "./action";
import {APIRoute, AuthorizationStatus, avatarPlaceholder, HttpCode, LOCAL_STORE_KEYS, Routes, ReviewLoadingStatus} from './../const';
import {adaptOfferToClient, adaptReviewsToClient} from "./adapters";
import {sortDate} from "../utils";
import Store from "./local-store";

const STORE_AUTH_PREFIX = `sixcities-auth-localstorage`;
const STORE_VER = `v1`;
const STORE_AUTH_NAME = `${STORE_AUTH_PREFIX}-${STORE_VER}`;

const localStore = new Store(STORE_AUTH_NAME, window.localStorage);


export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
  .then(({data}) => dispatch(loadOffers(data.map((offer)=> adaptOfferToClient(offer)))))
);

export const fetchOpenedOfferData = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${APIRoute.HOTELS}/${id}`),
    api.get(`${APIRoute.HOTELS}/${id}/nearby`),
    api.get(`${APIRoute.COMMENTS }/${id}`)
  ])
    .then(([offer, nearby, comments]) => {
      const sortedComments = comments.data.sort(sortDate);
      dispatch(setOpenOffer(adaptOfferToClient(offer.data)));
      dispatch(setNearbyOffers(nearby.data.map((nearbyOffer) => adaptOfferToClient(nearbyOffer))));
      dispatch(setCurrentReviews(sortedComments.map((comment) => adaptReviewsToClient(comment))));
    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.NOT_FOUND:
          dispatch(redirectToRoute(Routes.NOT_FOUND));
          break;

        default:
          dispatch(setErrorMessage(response.status));
          break;
      }
    })
);

export const fetchFavoriteList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVOR)
    .then(({data}) => dispatch(setFavoriteList(data.map((offer) => adaptOfferToClient(offer)))))
   .catch((err) => {
     const {response} = err;
     switch (response.status) {
       case HttpCode.UNAUTHORIZED:
         dispatch(redirectToRoute(Routes.LOGIN));
         dispatch(changeUserAvatar(avatarPlaceholder));
         localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
         localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
         localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);
         break;

       default:
         dispatch(setErrorMessage(response.status));
         break;
     }
   })
);

export const toggleFavorOnServer = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVOR}/${id}/${status}`)
    .then(({data}) => {
      const adaptedOffer = adaptOfferToClient(data);
      dispatch(toggleFavor(adaptedOffer));

      if (status) {
        dispatch(addCardToFavoriteList(adaptedOffer));
      } else {
        dispatch(removeCardFromFavoriteList(adaptedOffer.id));
      }

    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.UNAUTHORIZED:
          dispatch(redirectToRoute(Routes.LOGIN));
          dispatch(changeUserAvatar(avatarPlaceholder));
          localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
          localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
          localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);
          break;

        default:
          dispatch(setErrorMessage(response.status));
          break;
      }
    })
);

export const submitComment = (id, {review: comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${id}`, {comment, rating})
    .then(({data}) => {
      const sortedComments = data.sort(sortDate);
      dispatch(setCurrentReviews(sortedComments.map((item) => adaptReviewsToClient(item))));
      dispatch(setLoadingReviewStatus(ReviewLoadingStatus.LOADED));
    })
    .catch((err) => {
      const {response} = err;
      switch (response.status) {
        case HttpCode.UNAUTHORIZED:
          dispatch(redirectToRoute(Routes.LOGIN));
          dispatch(changeUserAvatar(avatarPlaceholder));
          localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
          localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
          localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);
          break;

        default:
          dispatch(setErrorMessage(response.status));
          dispatch(setLoadingReviewStatus(ReviewLoadingStatus.LOADING_FAILED));
          break;
      }
    })
);

export const checkAuth = () => (dispatch, _getState, api) => {
  const {authorizationStatus, email, avatarUrl} = localStore.getItems();

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
    dispatch(changeUserName(email));
    dispatch(changeUserAvatar(avatarUrl));
    return;
  }

  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(changeUserName(data.email));
      dispatch(changeUserAvatar(data[`avatar_url`]));
    })
    .catch(()=> {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(changeUserName(email));
      dispatch(changeUserAvatar(data[`avatar_url`]));

      localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
      localStore.setItem(LOCAL_STORE_KEYS.EMAIL, email);
      localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, data[`avatar_url`]);

      dispatch(redirectToRoute(Routes.MAIN));
    })
    .catch(({response}) => {
      dispatch(setErrorMessage(response.status));
    })
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => {
      dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch(changeUserAvatar(avatarPlaceholder));

      localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
      localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
      localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);
    })
    .catch(({response}) => {
      dispatch(setErrorMessage(response.status));
    })
);
