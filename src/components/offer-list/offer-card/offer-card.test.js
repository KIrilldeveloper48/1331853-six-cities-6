import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router';

import OfferCard from './offer-card';

const mockStore = configureStore();
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
describe(`Should render 'OfferCard' component correctly on different pages and with different parameters`, () => {
  it(`Render 'OfferCard' on main page when parameters 'isFavorite' and 'isPremium' is true`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer1} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`cities__place-card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`cities__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).toHaveClass(`place-card__bookmark-button--active`);

  });

  it(`Render 'OfferCard' on main page when parameters 'isFavorite' and 'isPremium' is false`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer2} mode="MAIN"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).not.toContainHTML(`<div className="place-card__mark"></div>`);

    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`cities__place-card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`cities__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).not.toHaveClass(`place-card__bookmark-button--active`);

  });

  it(`Render 'OfferCard' on offer page when parameters 'isFavorite' and 'isPremium' is true`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer1} mode="OFFER"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`near-places__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`near-places__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).toHaveClass(`place-card__bookmark-button--active`);

  });

  it(`Render 'OfferCard' on offer page when parameters 'isFavorite' and 'isPremium' is false`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer2} mode="OFFER"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).not.toContainHTML(`<div className="place-card__mark"></div>`);

    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`near-places__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`near-places__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).not.toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).not.toHaveClass(`place-card__bookmark-button--active`);

  });

  it(`Render 'OfferCard' on favorite page when parameters 'isFavorite' and 'isPremium' is true`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer1} mode="FAVOR"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`favorites__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`favorites__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).toHaveClass(`place-card__bookmark-button--active`);

  });

  it(`Render 'OfferCard' on favorite page when parameter 'isPremium' is false`, () => {

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <OfferCard {...testOfferVer3} mode="FAVOR"/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`card-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`card-1`)).not.toContainHTML(`<div className="place-card__mark"></div>`);

    expect(screen.getByText(`120`)).toBeInTheDocument();
    expect(screen.getByText(`bad room`)).toBeInTheDocument();
    expect(screen.getByText(`apartment`)).toBeInTheDocument();

    expect(screen.getByTestId(`card-1`)).toHaveClass(`favorites__card`);
    expect(screen.getByTestId(`card-1-image`)).toHaveClass(`favorites__image-wrapper`);
    expect(screen.getByTestId(`card-1-info`)).toHaveClass(`favorites__card-info`);
    expect(screen.getByTestId(`card-1-bookmark`)).toHaveClass(`place-card__bookmark-button--active`);

  });
});


