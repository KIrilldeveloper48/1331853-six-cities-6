import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import OfferCard from './offer-card';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import {createApi} from './../../../services/api';
import MockAdapter from 'axios-mock-adapter';

import {APIRoute} from '../../../const';
import {toggleFavorOnServer} from '../../../store/api-actions';

const middleware = [thunk];
const mockStore = configureStore(
    middleware
);

const history = createMemoryHistory();

const testOfferVer1 = {
  id: 1,
  previewImage: `img/1.png`,
  price: 120,
  type: `apartment`,
  rating: 3,
  isPremium: true,
  title: `bad room`,
  isFavorite: true
};

const testOfferVer2 = {
  id: 1,
  previewImage: `img/1.png`,
  price: 120,
  type: `apartment`,
  rating: 3,
  isPremium: false,
  title: `bad room`,
  isFavorite: false
};

const testOfferVer3 = {
  id: 1,
  previewImage: `img/1.png`,
  price: 120,
  type: `apartment`,
  rating: 3,
  isPremium: false,
  title: `bad room`,
  isFavorite: true
};
describe(`Test 'OfferCard'`, () => {
  it(`'OfferCard' should be render correctly on the main page`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
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
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-image`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-info`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-bookmark`)).toBeInTheDocument();

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
    expect(screen.getByText(`Rating`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`cities__place-card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`cities__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
  });

  it(`'OfferCard' should be render correctly on the offer page`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
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
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="OFFER"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-image`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-info`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-bookmark`)).toBeInTheDocument();

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
    expect(screen.getByText(`Rating`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`near-places__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`near-places__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
  });

  it(`'OfferCard' should be render correctly on the favorites page`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
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
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="FAVOR"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-image`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-info`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-bookmark`)).toBeInTheDocument();

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
    expect(screen.getByText(`Rating`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`favorites__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`favorites__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).toHaveClass(`favorites__card-info`);
  });

  it(`Render 'OfferCard' correctly when parameters 'isFavorite' and 'isPremium' is false`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
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
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).not.toContainHTML(`<div className="place-card__mark"></div>`);

    expect(screen.getByTestId(`card-1-bookmark`)).not.toHaveClass(`place-card__bookmark-button--active`);
  });

  it(`Render 'OfferCard' correctly when parameters 'isFavorite' and 'isPremium' is true`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
        "isPro": false,
        "name": ``
      },
      "id": 1,
      "images": [``, ``],
      "isFavorite": true,
      "isPremium": true,
      "location": {
        "latitude": 1,
        "longitude": 1,
        "zoom": 1
      },
      "maxAdults": 1,
      "previewImage": ``,
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1-bookmark`)).toHaveClass(`place-card__bookmark-button--active`);
  });

  it(`Logic should be worked correctly on the main page`, () => {
    const api = createApi(() => { });
    const apiMock = new MockAdapter(api);
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
        "isPro": false,
        "name": ``
      },
      "id": 1,
      "images": [``, ``],
      "isFavorite": true,
      "isPremium": true,
      "location": {
        "latitude": 1,
        "longitude": 1,
        "zoom": 1
      },
      "maxAdults": 1,
      "previewImage": ``,
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };
    const fakeDispatch = jest.spyOn(redux, `useDispatch`);

    apiMock
      .onGet(`${APIRoute.FAVOR}/${1}/${1}`)
      .reply(200, [{}]);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    userEvent.hover(screen.getByTestId(`card-1`));
    expect(fakeDispatch).toBeCalled();

    userEvent.unhover(screen.getByTestId(`card-1`));
    expect(fakeDispatch).toBeCalled();

    userEvent.click(screen.getByTestId(`card-1-bookmark`));
    expect(fakeDispatch);

  });

  it(`Logic should be worked correctly on the offer page`, () => {
    const testOffer = {
      "bedrooms": 1,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Paris`
      },
      "description": ``,
      "goods": [``, ``],
      "host": {
        "avatarUrl": ``,
        "id": 1,
        "isPro": false,
        "name": ``
      },
      "id": 1,
      "images": [``, ``],
      "isFavorite": true,
      "isPremium": true,
      "location": {
        "latitude": 1,
        "longitude": 1,
        "zoom": 1
      },
      "maxAdults": 1,
      "previewImage": ``,
      "price": 1,
      "rating": 1,
      "title": ``,
      "type": ``
    };
    const fakeDispatch = jest.spyOn(redux, `useDispatch`);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOffer} mode="OFFER"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    userEvent.hover(screen.getByTestId(`card-1`));
    expect(fakeDispatch).not.toBeCalled();

    userEvent.unhover(screen.getByTestId(`card-1`));
    expect(fakeDispatch).not.toBeCalled();

  });
});


