import {SORT_TYPES} from "../../const";
import {changeCity, changeSort, removeActiveOffer, setActiveOffer} from "../action";
import {main} from "./main";

describe(`Reducer work correctly`, () => {

  it(`Reducer with no additional parameters should return initial state`, () => {
    expect(main(undefined, {}))
      .toEqual({
        city: `Paris`,
        activeOffer: false,
        currentSort: SORT_TYPES.POPULAR,
      });
  });

  it(`Reducer should change city`, () => {
    const state = {city: `Paris`};

    expect(main(state, changeCity(`Amsterdam`)))
      .toEqual({
        city: `Amsterdam`
      });
  });

  it(`Reducer should set active offer`, () => {
    const state = {activeOffer: false};

    expect(main(state, setActiveOffer(2)))
      .toEqual({
        activeOffer: 2
      });
  });

  it(`Reducer should remove active offer`, () => {
    const state = {activeOffer: 2};

    expect(main(state, removeActiveOffer()))
      .toEqual({
        activeOffer: false
      });
  });

  it(`Reducer should change sorting type`, () => {
    const state = {currentSort: `Popular`};

    expect(main(state, changeSort(`High to low`)))
      .toEqual({
        currentSort: `High to low`
      });
  });
});
