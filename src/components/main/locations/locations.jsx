import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../../store/action';
import {CITY_LIST} from '../../../const';

const Locations = () => {
  const {city} = useSelector((state) => state.MAIN);
  const dispatch = useDispatch();

  const menuClickHandler = (currentCity) => {
    dispatch(changeCity(currentCity));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list" >
        {CITY_LIST.map((item) => (
          <li key={item} className="locations__item">
            <a className={`locations__item-link tabs__item ${item === city ? `tabs__item--active` : ``}`} >
              <span onClick={() => menuClickHandler(item)}>{item}</span>
            </a>
          </li>
        )
        )}
      </ul>
    </section>
  );
};

export default React.memo(Locations);
