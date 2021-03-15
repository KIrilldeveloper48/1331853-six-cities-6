export const avatarPlaceholder = `../img/avatar.svg`;

export const Routes = {
  MAIN: `/`,
  OFFER: `/offer/:id`,
  LOGIN: `/login`,
  FAVOR: `/favorites`,
  NOT_FOUND: `/404`
};

export const APIRoute = {
  HOTELS: `/hotels`,
  FAVOR: `/favorite`,
  COMMENTS: `/comments`,
  LOGIN: `/login`,
  LOGOUT: `/logout`
};

export const CARD_CLASS_NAME = {
  MAIN: {
    article: `cities__place-card`,
    image: `cities__image-wrapper`
  },
  OFFER: {
    article: `near-places__card`,
    image: `near-places__image-wrapper`
  },
  FAVOR: {
    article: `favorites__card`,
    image: `favorites__image-wrapper`,
    info: `favorites__card-info`
  }
};

export const MAP_CLASS_NAME = {
  MAIN: `cities__map`,
  OFFER: `property__map`
};

export const CITY_LIST = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
export const STAR_LIST = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

export const SORT_TYPES = {
  POPULAR: `popular`,
  LOW_PRICE: `low-price`,
  HIGH_PRICE: `high-price`,
  TOP_RATED: `top-rated`
};

export const SORT_TEXTS = {
  [SORT_TYPES.POPULAR]: `Popular`,
  [SORT_TYPES.LOW_PRICE]: `Price: low to high`,
  [SORT_TYPES.HIGH_PRICE]: `Price: high to low`,
  [SORT_TYPES.TOP_RATED]: `Top rated first`,
};

export const SORT_LIST = [
  {
    text: SORT_TEXTS[SORT_TYPES.POPULAR],
    type: SORT_TYPES.POPULAR
  },
  {
    text: SORT_TEXTS[SORT_TYPES.LOW_PRICE],
    type: SORT_TYPES.LOW_PRICE
  },
  {
    text: SORT_TEXTS[SORT_TYPES.HIGH_PRICE],
    type: SORT_TYPES.HIGH_PRICE
  },
  {
    text: SORT_TEXTS[SORT_TYPES.TOP_RATED],
    type: SORT_TYPES.TOP_RATED
  },
];

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

export const LOCAL_STORE_KEYS = {
  AUTH: `authorizationStatus`,
  EMAIL: `email`,
  AVATAR_URL: `avatarUrl`
};

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

export const ReviewValid = {
  MAX_LENGTH: 300,
  MIN_LENGTH: 50
};

export const ReviewLoadingStatus = {
  LOADED: `loaded`,
  LOADING: `loading`,
  LOADING_FAILED: `loadingFailed`
};
