import React from 'react';
import {render, screen} from '@testing-library/react';

import Bookmark from './bookmark';
import userEvent from '@testing-library/user-event';


describe(`Test 'Bookmark'`, () => {
  it(`Render 'Bookmark' when parameters 'isFavorite', is true`, () => {

    render(
        <Bookmark onCardFavorClick={() => { }} isFavorite={true} id={1}/>
    );

    expect(screen.getByTestId(`offer-property-bookmark`)).toBeInTheDocument();
    expect(screen.getByTestId(`offer-property-bookmark`)).toHaveClass(`property__bookmark-button--active`);
    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
  });

  it(`Render 'Bookmark' when parameters 'isFavorite', is false`, () => {

    render(
        <Bookmark onCardFavorClick={() => { }} isFavorite={false} id={1}/>
    );

    expect(screen.getByTestId(`offer-property-bookmark`)).toBeInTheDocument();
    expect(screen.getByTestId(`offer-property-bookmark`)).not.toHaveClass(`property__bookmark-button--active`);
  });

  it(`Logic should worked correctly`, () => {
    const fakeCallback = jest.fn();
    render(
        <Bookmark onCardFavorClick={fakeCallback} isFavorite={false} id={1}/>
    );

    expect(screen.getByTestId(`offer-property-bookmark`)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(`offer-property-bookmark`));
    expect(fakeCallback).toBeCalled();
  });


});


