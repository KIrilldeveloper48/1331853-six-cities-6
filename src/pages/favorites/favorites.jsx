import React, {useEffect} from 'react';

import LocationBtn from '../../components/common/location-btn';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-list/offer-list';
import Loading from '../../components/loading/loading';
import Toast from '../../components/toast/toast';
import FavoritesEmpty from './empty/empty';

import {useDispatch, useSelector} from 'react-redux';
import {getCurrentOffers} from '../../utils';
import {changeCity} from '../../store/action';
import {fetchFavoriteList} from './../../store/api-actions';
import FavoriteItem from '../../components/favorites/favorite-item/favorite-item';


const Favorites = () => {
  const {favoriteList, isFavoriteListLoaded} = useSelector((state)=> state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoriteListLoaded) {
      dispatch(fetchFavoriteList());
    }
  }, [isFavoriteListLoaded]);

  if (!isFavoriteListLoaded) {
    return (
      <Loading />
    );
  }

  const cityList = [...new Set(favoriteList.map((offer) => offer.city.name))];

  const cardClickHandler = (city) => {
    dispatch(changeCity(city));
  };

  return (
    <>
      {
        favoriteList.length ?
          <div className="page" data-testid="favorites">
            <Toast />
            <Header />
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {
                      cityList.map((city) => (
                        <FavoriteItem key={city} city={city} cardClickCallback={cardClickHandler}/>
                      ))
                    }
                  </ul>
                </section>
              </div>
            </main>
            <Footer />
          </div>
          : <FavoritesEmpty />
      }
    </>
  );
};

export default Favorites;
