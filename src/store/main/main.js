import {createReducer} from '@reduxjs/toolkit';
import {SORT_TYPES} from "../../const";
import {changeCity, changeSort, removeActiveOffer, setActiveOffer} from '../action';

const initialState = {
  city: `Paris`,
  activeOffer: false,
  currentSort: SORT_TYPES.POPULAR,
};

const main = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });

  builder.addCase(setActiveOffer, (state, action) => {
    state.activeOffer = action.payload;
  });

  builder.addCase(removeActiveOffer, (state) => {
    state.activeOffer = false;
  });

  builder.addCase(changeSort, (state, action) => {
    state.currentSort = action.payload;
  });
});

export {main};
