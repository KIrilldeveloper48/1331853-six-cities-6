import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import App from './app';

const mockStore = configureStore();

const testData = {
  USER: {
    authorizationStatus: `AUTH`,
    userName: ``,
    avatarUrl: ``,
    errorMessage: ``
  },
  MAIN: {
    city: `Paris`,
    currentSort: `Popular`,
    activeOffer: false,
  },
  DATA: {
    isDataLoaded: true,
    openedOffer: {
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Amsterdam`
      },
      "description": ``,
      "goods": [`1`, `2`],
      "host": {
        "avatarUrl": ``,
        "id": 3,
        "isPro": false,
        "name": `Angelina`
      },
      "id": 3,
      "images": [``, ``],
      "isFavorite": false,
      "isPremium": false,
      "location": {
        "latitude": 1,
        "longitude": 1,
        "zoom": 1
      },
      "maxAdults": 1,
      "previewImage": ``,
      "price": 100,
      "rating": 4,
      "title": `Beautiful palace`,
      "type": ``
    },
    offers: [
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 1,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 2,
          "isPro": false,
          "name": ``
        },
        "id": 2,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Amsterdam`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 3,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      }
    ],
    currentReviews: [
      {
        "comment": ``,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatarUrl": ``,
          "id": 4,
          "isPro": false,
          "name": ``
        }
      },
      {
        "comment": ``,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 2,
        "rating": 4,
        "user": {
          "avatarUrl": ``,
          "id": 4,
          "isPro": false,
          "name": ``
        }
      }
    ],
    nearbyOffers: [
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": ``
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 1,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": ``
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 2,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": ``
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 3,
        "images": [``, ``],
        "isFavorite": false,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      }
    ],
    favoriteList: [
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 3,
          "isPro": false,
          "name": ``
        },
        "id": 1,
        "images": [``, ``],
        "isFavorite": true,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
      {
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
            "zoom": 1
          },
          "name": `Paris`
        },
        "description": ``,
        "goods": [`1`, `2`],
        "host": {
          "avatarUrl": ``,
          "id": 2,
          "isPro": false,
          "name": ``
        },
        "id": 2,
        "images": [``, ``],
        "isFavorite": true,
        "isPremium": false,
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "maxAdults": 1,
        "previewImage": ``,
        "price": 100,
        "rating": 4,
        "title": ``,
        "type": ``
      },
    ],
    isFavoriteListLoaded: true,

  }
};
describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'OfferProperty' when user navigate to '/offer/:id' url`, () => {
    const history = createMemoryHistory();
    history.push(`/offer/3`);

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`offer-property`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByText(`Beautiful palace`)).toBeInTheDocument();
    expect(screen.getByTestId(`gallery`)).toBeInTheDocument();
    expect(screen.getByTestId(`map`)).toBeInTheDocument();
    expect(screen.getByTestId(`inside-list`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-3`)).toBeInTheDocument();
    expect(screen.getByTestId(`review-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`review-2`)).toBeInTheDocument();

  });

  it(`Render 'Main' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`main-page`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByText(`Cities`)).toBeInTheDocument();
    expect(screen.getByText(`Places`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
  });

  it(`Render 'Login' when user navigate to '/login' url`, () => {
    const store = {MAIN: {city: ``}, USER: {authorizationStatus: `NO_AUTH`, userName: ``, avatarUrl: ``, errorMessage: ``}};
    const history = createMemoryHistory();
    history.push(`/login`);

    render(
        <redux.Provider store={mockStore(store)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`header`)).toBeInTheDocument();

    expect(screen.getByTestId(`login-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`login-submit`)).toBeInTheDocument();
    expect(screen.getByLabelText(`E-mail`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Password`)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    history.push(`/favorites`);

    render(
        <redux.Provider store={mockStore(testData)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`favorites`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByTestId(`footer`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
  });

  it(`Render 'Page404' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent route`);

    render(
        <redux.Provider store={mockStore({USER: {authorizationStatus: ``, userName: ``, avatarUrl: ``}})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`page-404`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByText(`404`)).toBeInTheDocument();
    expect(screen.getByText(`We are sorry, Page not found!`)).toBeInTheDocument();
    expect(screen.getByText(`The page you are looking for might have been removed had its name changed or is temporarily unavailable.`)).toBeInTheDocument();
    expect(screen.getByText(`Back To Homepage`)).toBeInTheDocument();
  });
});


