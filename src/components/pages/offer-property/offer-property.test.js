import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import App from '../../app/app';

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
      "bedrooms": 4,
      "city": {
        "location": {
          "latitude": 1,
          "longitude": 1,
          "zoom": 1
        },
        "name": `Amsterdam`
      },
      "description": `Hi hi ha ha`,
      "goods": [`1`, `2`],
      "host": {
        "avatarUrl": `image/avatar.jpg`,
        "id": 3,
        "isPro": true,
        "name": `Kirill`
      },
      "id": 3,
      "images": [``, ``],
      "isFavorite": true,
      "isPremium": true,
      "location": {
        "latitude": 1,
        "longitude": 1,
        "zoom": 1
      },
      "maxAdults": 4,
      "previewImage": ``,
      "price": 140,
      "rating": 4,
      "title": `Beautiful palace`,
      "type": `apartment`
    },
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
    ]
  }
};


describe(`Test 'OfferProperty'`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);
  it(`OfferProperty' should render correctly`, () => {
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
    expect(screen.getByTestId(`offer-property-bookmark`)).toBeInTheDocument();

    expect(screen.getByTestId(`map`)).toBeInTheDocument();
    expect(screen.getByTestId(`inside-list`)).toBeInTheDocument();
    expect(screen.getByTestId(`offer-property-user-avatar`)).toHaveAttribute(`src`, `image/avatar.jpg`);
    expect(screen.getByTestId(`offer-property-type`)).toContainHTML(`apartment`);
    expect(screen.getByTestId(`offer-property-user-name`)).toContainHTML(`Kirill`);
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

    expect(screen.getByTestId(`property-wrapper`)).toContainElement(screen.getByTestId(`property-mark`));
    expect(screen.getByTestId(`offer-property-user`)).toContainElement(screen.getByTestId(`offer-property-user-pro`));
  });

  it(`Render 'OfferProperty' when parameters 'isFavorite', 'isPremium' and 'isPro' is false`, () => {
    const history = createMemoryHistory();
    history.push(`/offer/3`);

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
          "bedrooms": 4,
          "city": {
            "location": {
              "latitude": 1,
              "longitude": 1,
              "zoom": 1
            },
            "name": `Amsterdam`
          },
          "description": `Hi hi ha ha`,
          "goods": [`1`, `2`],
          "host": {
            "avatarUrl": `image/avatar.jpg`,
            "id": 3,
            "isPro": false,
            "name": `Kirill`
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
          "maxAdults": 4,
          "previewImage": ``,
          "price": 140,
          "rating": 4,
          "title": `Beautiful palace`,
          "type": `apartment`
        },
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
        ]
      }
    };

    render(
        <redux.Provider store={mockStore(testDataVer2)}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`offer-property`)).toBeInTheDocument();
    expect(screen.getByTestId(`property-wrapper`)).not.toContainHTML(`<div className="property__mark" data-testid="property-mark"></div>`);
    expect(screen.getByTestId(`offer-property-user`)).not.toContainHTML(`<span className="property__user-status" data-testid="offer-property-user-pro">Pro</span>`);
  });
});


