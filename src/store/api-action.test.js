import MockAdapter from 'axios-mock-adapter';
import {APIRoute, AuthorizationStatus, avatarPlaceholder, LOCAL_STORE_KEYS, ReviewLoadingStatus, Routes} from '../const';
import {createApi} from './../services/api';
import {ActionType} from './action';
import {checkAuth, fetchFavoriteList, fetchOfferList, fetchOpenedOfferData, submitComment, toggleFavorOnServer, localStore, login, logout} from './api-actions';

const api = createApi(() => { });

const initialOffer = {
  "id": 1,
  "host": {
    "avatar_url": `image/avatar.jpg`,
    "is_pro": false
  },
  "is_favorite": false,
  "is_premium": false,
  "max_adults": 4,
  "preview_image": `image/preview.png`
};

const adaptedOffer = {
  "id": 1,
  "host": {
    "avatarUrl": `image/avatar.jpg`,
    "isPro": false
  },
  "isFavorite": false,
  "isPremium": false,
  "maxAdults": 4,
  "previewImage": `image/preview.png`
};

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerLoader = fetchOfferList();

    apiMock
      .onGet(APIRoute.HOTELS)
      .reply(200, [initialOffer]);

    return offerLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [adaptedOffer]
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id, /hotels/:id/nearby and /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferDataLoader = fetchOpenedOfferData(offerId);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${offerId}`)
      .reply(200, initialOffer);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${offerId}/nearby`)
      .reply(200, [initialOffer]);

    apiMock
      .onGet(`${APIRoute.COMMENTS }/${offerId}`)
      .reply(200, [{
        "user": {
          "is_pro": false,
          "avatar_url": `image/avatar.jpg`
        }
      }]);

    return openedOfferDataLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_OPEN_OFFER,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_NEARBY_OFFERS,
          payload: [adaptedOffer]
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_CURRENT_REVIEWS,
          payload: [{
            "user": {
              "isPro": false,
              "avatarUrl": `image/avatar.jpg`
            }
          }]
        });

      });
  });

  it(`The API call to /hotels/:id, /hotels/:id/nearby and /comments/:id had resulted in error 404`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferDataLoader = fetchOpenedOfferData(offerId);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${offerId}`)
      .reply(404, {response: {status: 404}});

    return openedOfferDataLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: Routes.NOT_FOUND
        });
      });
  });

  it(`The API call to /hotels/:id, /hotels/:id/nearby and /comments/:id had resulted in an error other then 404`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const openedOfferDataLoader = fetchOpenedOfferData(offerId);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${offerId}`)
      .reply(401, {response: {status: 401}});

    return openedOfferDataLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 401
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavoriteList();

    apiMock
      .onGet(APIRoute.FAVOR)
      .reply(200, [initialOffer]);

    return favoriteListLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITE_LIST,
          payload: [adaptedOffer]
        });
      });
  });

  it(`The API call to /favorite had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavoriteList();

    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
    localStore.setItem(LOCAL_STORE_KEYS.EMAIL, `Kirill@yandex.ru`);
    localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, `image/avatar.jpg`);

    apiMock
      .onGet(APIRoute.FAVOR)
      .reply(401, {response: {status: 401}});

    return favoriteListLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: Routes.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: avatarPlaceholder
        });

        expect(localStore.getItems()).toEqual({});
      });
  });

  it(`The API call to /favorite had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavoriteList();

    apiMock
      .onGet(APIRoute.FAVOR)
      .reply(404, {response: {status: 404}});

    return favoriteListLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });

      });
  });

  it(`Should make a correct API call to /favorite/:id/:status if the status is true`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const togglerFavorOnServer = toggleFavorOnServer(offerId, status);

    apiMock
      .onPost(`${APIRoute.FAVOR}/${offerId}/${status}`)
      .reply(200, initialOffer);

    return togglerFavorOnServer(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TOGGLE_FAVOR,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.ADD_CARD_TO_FAVORITE_LIST,
          payload: adaptedOffer
        });

      });
  });

  it(`Should make a correct API call to /favorite/:id/:status if the status is false`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 0;
    const togglerFavorOnServer = toggleFavorOnServer(offerId, status);

    apiMock
      .onPost(`${APIRoute.FAVOR}/${offerId}/${status}`)
      .reply(200, initialOffer);

    return togglerFavorOnServer(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TOGGLE_FAVOR,
          payload: adaptedOffer
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REMOVE_CARD_FROM_FAVORITE_LIST,
          payload: adaptedOffer.id
        });

      });
  });

  it(`The API call to /favorite/:id/:status had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const togglerFavorOnServer = toggleFavorOnServer(offerId, status);

    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
    localStore.setItem(LOCAL_STORE_KEYS.EMAIL, `Kirill@yandex.ru`);
    localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, `image/avatar.jpg`);

    apiMock
      .onPost(`${APIRoute.FAVOR}/${offerId}/${status}`)
      .reply(401, {response: {status: 401}});

    return togglerFavorOnServer(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: Routes.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: avatarPlaceholder
        });

        expect(localStore.getItems()).toEqual({});
      });
  });

  it(`The API call to /favorite/:id/:status had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 1;
    const status = 1;
    const togglerFavorOnServer = toggleFavorOnServer(offerId, status);

    apiMock
      .onPost(`${APIRoute.FAVOR}/${offerId}/${status}`)
      .reply(404, {response: {status: 404}});

    return togglerFavorOnServer(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterComment = submitComment(commentId, testComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${commentId}`)
      .reply(200, [{
        "comment": `it couldn't be worse!`,
        "date": `2019-06-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `img/1.png`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      },
      ]);
    return submitterComment(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_CURRENT_REVIEWS,
          payload: [
            {
              "comment": `it couldn't be worse!`,
              "date": `2019-06-08T14:13:56.569Z`,
              "id": 1,
              "rating": 4,
              "user": {
                "avatarUrl": `img/1.png`,
                "isPro": false,
              }
            }]
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOADING_REVIEW_STATUS,
          payload: ReviewLoadingStatus.LOADED
        });

      });
  });

  it(`The API call to /comments/:id had resulted in error 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterComment = submitComment(commentId, testComment);

    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
    localStore.setItem(LOCAL_STORE_KEYS.EMAIL, `Kirill@yandex.ru`);
    localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, `image/avatar.jpg`);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${commentId}`)
      .reply(401, {response: {status: 401}});

    return submitterComment(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: Routes.LOGIN
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: avatarPlaceholder
        });

        expect(localStore.getItems()).toEqual({});
      });
  });

  it(`The API call to /comments/:id had resulted in an error other then 401`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentId = 1;
    const testComment = {comment: `it couldn't be worse!`, rating: 4};
    const submitterComment = submitComment(commentId, testComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${commentId}`)
      .reply(404, {response: {status: 404}});

    return submitterComment(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 404
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_LOADING_REVIEW_STATUS,
          payload: ReviewLoadingStatus.LOADING_FAILED
        });
      });
  });

  it(`Should pull the user data from local storage if authorization status is correct`, () => {
    const dispatch = jest.fn();
    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
    localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, `image/avatar.jpg`);
    localStore.setItem(LOCAL_STORE_KEYS.EMAIL, `Kirill@yandex.ru`);
    const checkAuthLoader = checkAuth();
    const {email, avatarUrl} = localStore.getItems();

    checkAuthLoader(dispatch, () => { }, api);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.CHANGE_USER_NAME,
      payload: email
    });
    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: ActionType.CHANGE_USER_AVATAR,
      payload: avatarUrl
    });
  });

  it(`Should make a correct API call to /login to check authorization status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const checkAuthLoader = checkAuth();
    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.NO_AUTH);

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {"email": `Kirill@yandex.ru`, "avatar_url": `image.avatar.jpg`});

    return checkAuthLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_NAME,
          payload: `Kirill@yandex.ru`
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: `image.avatar.jpg`
        });

      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `Kirill@yandex.ru`, password: `123`};
    const loginLoader = login(fakeUser);
    localStore.removeItem(LOCAL_STORE_KEYS.AUTH);
    localStore.removeItem(LOCAL_STORE_KEYS.EMAIL);
    localStore.removeItem(LOCAL_STORE_KEYS.AVATAR_URL);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, {"email": `Kirill@yandex.ru`, "avatar_url": `image.avatar.jpg`});

    return loginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_NAME,
          payload: `Kirill@yandex.ru`
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: `image.avatar.jpg`
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: Routes.MAIN
        });

        expect(localStore.getItems()).toEqual({authorizationStatus: `AUTH`, email: `Kirill@yandex.ru`, avatarUrl: `image.avatar.jpg`});

      });
  });

  it(`The API call to /login had resulted in an error`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `Kirill@yandex.ru`, password: `123`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(400, {response: 400});

    return loginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 400
        });

      });
  });

  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    localStore.setItem(LOCAL_STORE_KEYS.AUTH, AuthorizationStatus.AUTH);
    localStore.setItem(LOCAL_STORE_KEYS.EMAIL, `Kirill@yandex.ru`);
    localStore.setItem(LOCAL_STORE_KEYS.AVATAR_URL, `image/avatar.jpg`);

    apiMock
      .onGet(APIRoute.LOGOUT)
      .reply(200, {});

    return logoutLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_USER_AVATAR,
          payload: avatarPlaceholder
        });

        expect(localStore.getItems()).toEqual({});

      });
  });

  it(`The API call to /logout had resulted in an error`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(APIRoute.LOGOUT)
      .reply(400, {response: 400});

    return logoutLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: 400
        });

      });
  });

});
