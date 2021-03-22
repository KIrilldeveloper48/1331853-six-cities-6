import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';
import userEvent from '@testing-library/user-event';

import App from '../../components/app/app';

const mockStore = configureStore();

const testDataVer1 = {
  USER: {
    authorizationStatus: ``,
    userName: ``,
    avatarUrl: ``,
    errorMessage: ``
  },
  MAIN: {
    city: `Paris`,
    activeOffer: false,
  },
  DATA: {
    openedOffer: {
      "id": 3,
      "images": [``, ``],
      "isPremium": true,
      "isFavorite": true,
      "title": `Beautiful palace`,
      "rating": 4,
      "type": `apartment`,
      "bedrooms": 4,
      "maxAdults": 4,
      "price": 140,
      "goods": [``, ``],
      "host": {
        avatarUrl: `image/avatar.jpg`,
        name: `Kirill`,
        isPro: true
      },
      "description": `Hi hi ha ha`,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      "location": {
        "latitude": 1,
        "longitude": 1,
      },
    },
    currentReviews: [
      {
        id: 1,
        user: {
          avatarUrl: ``
        },
        rating: 4,
        comment: ``,
        data: `2019-05-08T14:13:56.569Z`
      },
      {
        id: 2,
        user: {
          avatarUrl: ``
        },
        rating: 4,
        comment: ``,
        data: `2019-05-08T14:13:56.569Z`
      }
    ],
    nearbyOffers: [
      {
        "id": 1,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "isPremium": true,
        "title": ``,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      {
        "id": 2,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "isPremium": true,
        "title": ``,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      {
        "id": 3,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "isPremium": true,
        "title": ``,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      }
    ]
  }
};

const testDataVer2 = {
  USER: {
    authorizationStatus: ``,
    userName: ``,
    avatarUrl: ``,
    errorMessage: ``
  },
  MAIN: {
    city: `Paris`,
    activeOffer: false,
  },
  DATA: {
    openedOffer: {
      "id": 3,
      "images": [``, ``],
      "isPremium": false,
      "isFavorite": false,
      "title": `Beautiful palace`,
      "rating": 4,
      "type": `apartment`,
      "bedrooms": 4,
      "maxAdults": 4,
      "price": 140,
      "goods": [`1`, `2`],
      "host": {
        avatarUrl: `image/avatar.jpg`,
        name: `Kirill`,
        isPro: false
      },
      "description": `Hi hi ha ha`,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      "location": {
        "latitude": 1,
        "longitude": 1,
      },
    },
    currentReviews: [
      {
        id: 1,
        user: {
          avatarUrl: ``
        },
        rating: 4,
        comment: ``,
        date: `2019-05-08T14:13:56.569Z`
      },
      {
        id: 2,
        user: {
          avatarUrl: ``
        },
        rating: 4,
        comment: ``,
        date: `2019-05-08T14:13:56.569Z`
      }
    ],
    nearbyOffers: [
      {
        "id": 1,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "isPremium": true,
        "title": ``,
        "bedrooms": 4,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      {
        "id": 2,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "bedrooms": 4,
        "isPremium": true,
        "title": ``,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      },
      {
        "id": 3,
        "previewImage": ``,
        "price": 120,
        "type": ``,
        "rating": 3,
        "bedrooms": 4,
        "isPremium": true,
        "title": ``,
        "isFavorite": true,
        "city": {
          "location": {
            "latitude": 1,
            "longitude": 1,
          },
        },
        "location": {
          "latitude": 1,
          "longitude": 1,
        },
      }
    ]
  }
};

describe(`Should render 'OfferProperty' page correctly with different parameters`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);
  it(`Render 'OfferProperty' when parameters 'isFavorite', 'isPremium' and 'isPro' is true`, () => {
    const history = createMemoryHistory();
    history.push(`/offer/3`);

    render(
        <redux.Provider store={mockStore(testDataVer1)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`offer-property`)).toBeInTheDocument();
    expect(screen.getByTestId(`toast`)).toBeInTheDocument();
    expect(screen.getByTestId(`header`)).toBeInTheDocument();
    expect(screen.getByTestId(`gallery`)).toBeInTheDocument();
    expect(screen.getByTestId(`property-wrapper`)).toContainElement(screen.getByTestId(`property-mark`));
    expect(screen.getByTestId(`offer-property-bookmark`)).toHaveClass(`property__bookmark-button--active`);
    expect(screen.getByTestId(`map`)).toBeInTheDocument();
    expect(screen.getByTestId(`inside-list`)).toBeInTheDocument();
    expect(screen.getByTestId(`offer-property-user-avatar`)).toHaveAttribute(`src`, `image/avatar.jpg`);
    expect(screen.getByTestId(`offer-property-type`)).toContainHTML(`apartment`);
    expect(screen.getByTestId(`offer-property-user-name`)).toContainHTML(`Kirill`);
    expect(screen.getByTestId(`offer-property-user`)).toContainElement(screen.getByTestId(`offer-property-user-pro`));
    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-2`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-3`)).toBeInTheDocument();
    expect(screen.getByTestId(`review-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`review-2`)).toBeInTheDocument();
    expect(screen.getByTestId(`offer-property-review-count`)).toContainHTML(`2`);

    expect(screen.getByText(`Beautiful palace`)).toBeInTheDocument();
    expect(screen.getByText(`4`)).toBeInTheDocument();
    expect(screen.getByText(`4 Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max 4 adults`)).toBeInTheDocument();
    expect(screen.getByText(`€140`)).toBeInTheDocument();
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByText(`Hi hi ha ha`)).toBeInTheDocument();
    expect(screen.getByText(`Reviews ·`)).toBeInTheDocument();
    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();


  });

  it(`Render 'OfferProperty' when parameters 'isFavorite', 'isPremium' and 'isPro' is false`, () => {
    const history = createMemoryHistory();
    history.push(`/offer/3`);

    render(
        <redux.Provider store={mockStore(testDataVer2)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`offer-property`)).toBeInTheDocument();
    expect(screen.getByTestId(`property-wrapper`)).not.toContainHTML(`<div className="property__mark" data-testid="property-mark"></div>`);
    expect(screen.getByTestId(`offer-property-bookmark`)).not.toHaveClass(`property__bookmark-button--active`);
    expect(screen.getByTestId(`offer-property-user`)).not.toContainHTML(`<span className="property__user-status" data-testid="offer-property-user-pro">Pro</span>`);
  });
});


