import {ActionType, addCardToFavoriteList, changeCity, changeSort, changeUserAvatar, changeUserName, loadOffers, redirectToRoute, removeActiveOffer, removeCardFromFavoriteList, requiredAuthorization, setActiveOffer, setCurrentReviews, setErrorMessage, setFavoriteList, setLoadingReviewStatus, setNearbyOffers, setOpenOffer, toggleFavor, toggleOpenedCardFavor} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for city swapping returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`
    };
    expect(changeCity(`Paris`)).toEqual(expectedAction);
  });

  it(`Action creator for setting active offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: 12
    };
    expect(setActiveOffer(12)).toEqual(expectedAction);
  });

  it(`Action creator for removing active offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REMOVE_ACTIVE_OFFER,
    };
    expect(removeActiveOffer()).toEqual(expectedAction);
  });

  it(`Action creator for changing current sorting type returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORT,
      payload: `Popular`
    };
    expect(changeSort(`Popular`)).toEqual(expectedAction);
  });

  it(`Action creator for loading offers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [{offer: 1}, {offer: 2}, {offer: 3}]
    };

    expect(loadOffers([{offer: 1}, {offer: 2}, {offer: 3}])).toEqual(expectedAction);
  });

  it(`Action creator for toggling favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.TOGGLE_FAVOR,
      payload: 15
    };
    expect(toggleFavor(15)).toEqual(expectedAction);
  });

  it(`Action creator for toggling opened card favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.TOGGLE_OPENED_CARD_FAVOR,
    };
    expect(toggleOpenedCardFavor()).toEqual(expectedAction);
  });

  it(`Action creator for setting open offer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_OPEN_OFFER,
      payload: {openedOffer: 1}
    };
    expect(setOpenOffer({openedOffer: 1})).toEqual(expectedAction);
  });

  it(`Action creator for setting nearby offers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_NEARBY_OFFERS,
      payload: [{offer: 1}, {offer: 2}, {offer: 3}]
    };
    expect(setNearbyOffers([{offer: 1}, {offer: 2}, {offer: 3}])).toEqual(expectedAction);
  });

  it(`Action creator for setting current reviews returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_CURRENT_REVIEWS,
      payload: [{review: 1}, {review: 2}, {review: 3}]
    };
    expect(setCurrentReviews([{review: 1}, {review: 2}, {review: 3}])).toEqual(expectedAction);
  });

  it(`Action creator for updating review loading status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_LOADING_REVIEW_STATUS,
      payload: `Loading`
    };
    expect(setLoadingReviewStatus(`Loading`)).toEqual(expectedAction);
  });

  it(`Action creator for setting favorite list status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_FAVORITE_LIST,
      payload: [{offer: 1}, {offer: 2}, {offer: 3}]
    };
    expect(setFavoriteList([{offer: 1}, {offer: 2}, {offer: 3}])).toEqual(expectedAction);
  });

  it(`Action creator for adding card to favorite list status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_CARD_TO_FAVORITE_LIST,
      payload: {card: 1}
    };
    expect(addCardToFavoriteList({card: 1})).toEqual(expectedAction);
  });

  it(`Action creator for removing card from favorite list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REMOVE_CARD_FROM_FAVORITE_LIST,
      payload: 10
    };
    expect(removeCardFromFavoriteList(10)).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: `AUTH`
    };
    expect(requiredAuthorization(`AUTH`)).toEqual(expectedAction);
  });

  it(`Action creator for changing user name returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_USER_NAME,
      payload: `Kirill`
    };
    expect(changeUserName(`Kirill`)).toEqual(expectedAction);
  });

  it(`Action creator for changing user avatar returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_USER_AVATAR,
      payload: `image/avatar.jpg`
    };
    expect(changeUserAvatar(`image/avatar.jpg`)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to route page returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `site/main`
    };
    expect(redirectToRoute(`site/main`)).toEqual(expectedAction);
  });

  it(`Action creator for setting error message returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Oops 404. I am so sorry!`
    };
    expect(setErrorMessage(`Oops 404. I am so sorry!`)).toEqual(expectedAction);
  });
});
