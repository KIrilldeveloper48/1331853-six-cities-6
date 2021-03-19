import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {changeSort} from '../../../store/action';
import {SORT_LIST, SORT_TEXTS} from '../../../const';

const Sort = () => {
  const {currentSort} = useSelector((state) => state.MAIN);
  const dispatch = useDispatch();

  const selectRef = useRef();

  const selectClickHandler = () => {
    selectRef.current.classList.toggle(`places__options--opened`);
  };

  const sortTypeClickHandler = (evt) => {
    dispatch(changeSort(evt.currentTarget.dataset.sortType));
    selectRef.current.classList.remove(`places__options--opened`);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" >Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => selectClickHandler()} data-testid="current-sort-type">
        {SORT_TEXTS[currentSort]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={selectRef}>
        {
          SORT_LIST.map(({text, type}) => (
            <li key={type} className={`places__option ${currentSort === type ? `places__option--active` : ``}`} data-sort-type={type} data-testid={type} tabIndex={0} onClick={(evt) => sortTypeClickHandler(evt)}>
              {text}
            </li>
          ))
        }
      </ul>
    </form>
  );
};

export default React.memo(Sort);
