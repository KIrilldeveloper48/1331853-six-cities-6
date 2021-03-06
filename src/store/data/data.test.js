import {addCardToFavoriteList, loadOffers, removeCardFromFavoriteList, setCurrentReviews, setFavoriteList, setLoadingReviewStatus, setNearbyOffers, setOpenOffer, toggleFavor, toggleOpenedCardFavor} from "../action";
import {data} from "./data";

describe(`Reducers work correctly`, () => {
  it(`Reducer with no additional parameters should return initial state`, () => {
    expect(data(undefined, {}))
      .toEqual({
        offers: [],
        isDataLoaded: false,
        openedOffer: {},
        nearbyOffers: [],
        currentReviews: false,
        reviewLoadingStatus: ``,
        favoriteList: [],
        isFavoriteListLoaded: false,
      });
  });

  it(`Reducer should set offers and change data loading status`, () => {
    const state = {offers: [], isDataLoaded: false};

    expect(data(state, loadOffers([{
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    }])))
      .toEqual({offers: [{
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }], isDataLoaded: true});
  });

  it(`Reducer should change favorite card for offer and nearby offer lists`, () => {
    const state = {
      offers: [
        {id: 1, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: false}
      ],
      nearbyOffers: [
        {id: 3, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 1, isFavorite: false}
      ]
    };

    expect(data(state, toggleFavor({id: 1, isFavorite: true})))
      .toEqual({
        offers: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: false},
          {id: 3, isFavorite: false}
        ],
        nearbyOffers: [
          {id: 3, isFavorite: false},
          {id: 2, isFavorite: false},
          {id: 1, isFavorite: true}
        ]
      });
  });

  it(`Reducer should return initial offer and nearby offer lists if ID is incorrect`, () => {
    const state = {
      offers: [
        {id: 1, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: false}
      ],
      nearbyOffers: [
        {id: 3, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 1, isFavorite: false}
      ]
    };

    expect(data(state, toggleFavor({id: 4, isFavorite: true})))
      .toEqual({
        offers: [
          {id: 1, isFavorite: false},
          {id: 2, isFavorite: false},
          {id: 3, isFavorite: false}
        ],
        nearbyOffers: [
          {id: 3, isFavorite: false},
          {id: 2, isFavorite: false},
          {id: 1, isFavorite: false}
        ]
      });
  });

  it(`Reducer should toggle favorite status for opened offer`, () => {
    const state = {
      openedOffer: {id: 3, isFavorite: false}
    };

    expect(data(state, toggleOpenedCardFavor()))
      .toEqual({
        openedOffer: {id: 3, isFavorite: true}
      });
  });

  it(`Reducer should set opened offer`, () => {
    const state = {
      openedOffer: {}
    };

    expect(data(state, setOpenOffer({id: 3, isFavorite: true})))
      .toEqual({
        openedOffer: {id: 3, isFavorite: true}
      });
  });

  it(`Reducer should set nearby offer list`, () => {
    const state = {
      nearbyOffers: []
    };

    expect(data(state, setNearbyOffers([
      {id: 3, isFavorite: true},
      {id: 2, isFavorite: false},
      {id: 1, isFavorite: false}
    ])))
      .toEqual({
        nearbyOffers: [
          {id: 3, isFavorite: true},
          {id: 2, isFavorite: false},
          {id: 1, isFavorite: false}
        ]
      });
  });

  it(`Reducer should set review list`, () => {
    const state = {
      currentReviews: false
    };

    expect(data(state, setCurrentReviews([
      {id: 1, comment: `good`},
      {id: 2, comment: `bad`},
      {id: 3, comment: `it couldn't be worse`}
    ])))
      .toEqual({
        currentReviews: [
          {id: 1, comment: `good`},
          {id: 2, comment: `bad`},
          {id: 3, comment: `it couldn't be worse`}
        ]
      });
  });

  it(`Reducer should set review loading status`, () => {
    const state = {
      reviewLoadingStatus: `false`
    };

    expect(data(state, setLoadingReviewStatus(`Loading`)))
      .toEqual({
        reviewLoadingStatus: `Loading`
      });
  });

  it(`Reducer should set favorite list and change favorite list's loading status`, () => {
    const state = {
      favoriteList: [],
      isFavoriteListLoaded: false
    };

    expect(data(state, setFavoriteList([
      {id: 3, isFavorite: true},
      {id: 2, isFavorite: true},
      {id: 1, isFavorite: true}
    ])))
      .toEqual({
        favoriteList: [
          {id: 3, isFavorite: true},
          {id: 2, isFavorite: true},
          {id: 1, isFavorite: true}
        ],
        isFavoriteListLoaded: true
      });
  });

  it(`Reducer should add the card to favorite list`, () => {
    const state = {
      favoriteList: [
        {id: 3, isFavorite: true},
        {id: 2, isFavorite: true},
      ],
    };

    expect(data(state, addCardToFavoriteList({id: 1, isFavorite: true})))
      .toEqual({
        favoriteList: [
          {id: 3, isFavorite: true},
          {id: 2, isFavorite: true},
          {id: 1, isFavorite: true}
        ]
      });
  });


  it(`Reducer should remove the card from favorite list`, () => {
    const state = {
      favoriteList: [
        {id: 3, isFavorite: true},
        {id: 2, isFavorite: true},
        {id: 1, isFavorite: true}
      ],
    };

    expect(data(state, removeCardFromFavoriteList(1)))
      .toEqual({
        favoriteList: [
          {id: 3, isFavorite: true},
          {id: 2, isFavorite: true},
        ]
      });
  });
});

