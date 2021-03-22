import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./toast.css";
import {setErrorMessage} from '../../store/action';

const SHOW_TIME = 5000;

const Toast = () => {
  const {errorMessage} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  if (errorMessage.length) {
    setTimeout(() => {
      dispatch(setErrorMessage(``));
    }, SHOW_TIME);
  }

  return (
    <div className="toast-container" style={{display: !errorMessage.length && `none`}} data-testid="toast">
      <div className="toast-item">Error {errorMessage} try later</div>
    </div>
  );
};

export default Toast;
