import {Routes, STAR_LIST} from "./const";

export const getRatingCount = (rating) => {
  const roundedRating = Math.round(rating);
  return 100 / STAR_LIST.length * roundedRating;
};
export const sortDate = (a, b) => (
  Date.parse(a.date) - Date.parse(b.date)
);

export const getOfferPath = (id) => Routes.OFFER.replace(/:id/, id);

export const getCurrentOffers = (city, offers) => (
  offers.filter((offer) => offer.city.name === city)
);
