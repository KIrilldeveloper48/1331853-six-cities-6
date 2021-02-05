import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';
import Login from '../login/login';
import PlaceProperty from '../place-property/place-property';
import Favorites from '../favorites/favorites';

const App = ({offersCount, places}) => {
  return (
    <>
      <Main offersCount={offersCount} places={places} />
      <Login />
      <PlaceProperty />
      <Favorites />
    </>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  places: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default App;
