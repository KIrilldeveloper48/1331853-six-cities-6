import React, {useEffect, useRef, useState} from 'react';
import Star from './star/star';
import {STAR_LIST, ReviewValid, ReviewLoadingStatus} from '../../../const';
import {useDispatch, useSelector} from 'react-redux';
import {setLoadingReviewStatus} from '../../../store/action';
import {PropTypes} from 'prop-types';

const UserReview = ({onFormSubmit}) => {
  const {reviewLoadingStatus} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  const submitButtonRef = useRef();
  const commentRef = useRef();
  const formRef = useRef();

  const [userReview, setUserReview] = useState({rating: 0, review: ``});
  const {review, rating} = userReview;

  const {MAX_LENGTH: maxLength, MIN_LENGTH: minLength} = ReviewValid;

  const formChangeHandler = (evt) => {
    if (evt.target.name === `rating`) {
      setUserReview({...userReview, rating: evt.target.value});
    } else {
      setUserReview({...userReview, review: evt.target.value});
    }
  };

  useEffect(() => {
    submitButtonRef.current.disabled = !(rating && review.length > minLength && review.length < maxLength);
  }, [review, rating]);

  useEffect(() => {
    switch (reviewLoadingStatus) {
      case ReviewLoadingStatus.LOADING:
        submitButtonRef.current.disabled = true;
        commentRef.current.disabled = true;
        break;

      case ReviewLoadingStatus.LOADED:
        commentRef.current.disabled = false;
        formRef.current.reset();

        setUserReview({review: ``, rating: 0});
        dispatch(setLoadingReviewStatus(``));
        break;

      case ReviewLoadingStatus.LOADING_FAILED:
        submitButtonRef.current.disabled = false;
        commentRef.current.disabled = false;
        dispatch(setLoadingReviewStatus(``));
        break;
    }
  }, [reviewLoadingStatus]);

  return (
    <form className="reviews__form form" action="#" method="post" onChange={(evt) => formChangeHandler(evt)} onSubmit={(evt) => onFormSubmit(evt, review, rating)} ref={formRef} data-testid="user-review">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          STAR_LIST.map((item, i) => <Star key={item} digit={STAR_LIST.length - i} title={item} isDisabled={reviewLoadingStatus === ReviewLoadingStatus.LOADING}/>)
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={``} ref={commentRef} required maxLength={maxLength} minLength={minLength} data-testid="user-review-input"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help" data-testid="user-review-help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled ref={submitButtonRef} data-testid="submit-button">Submit</button>
      </div>
    </form>
  );
};

UserReview.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};


export default UserReview;
