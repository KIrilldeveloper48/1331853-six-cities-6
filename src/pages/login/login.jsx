import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LocationBtn from '../../components/common/location-btn';
import Header from '../../components/header/header';
import Toast from '../../components/toast/toast';
import {login} from '../../store/api-actions';

const Login = () => {
  const {city} = useSelector((state) => state.MAIN);
  const dispatch = useDispatch();

  const loginRef = useRef();
  const passwordRef = useRef();

  const checkValidHandler = () => {
    let validMask = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (validMask.test(loginRef.current.value)) {
      loginRef.current.setCustomValidity(``);
    } else {
      loginRef.current.setCustomValidity(`Please provide a correct email address. Example: 'main@mail.com'`);
    }
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <>
      <div className="page page--gray page--login">
        <Toast />
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title" data-testid="login-title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="input-email">E-mail</label>
                  <input id="input-email" className="login__input form__input" type="email" name="email" placeholder="Email" required ref={loginRef} data-testid="login" onInput={checkValidHandler}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden" htmlFor="input-password">Password</label>
                  <input id="input-password" className="login__input form__input" type="password" name="password" placeholder="Password" required ref={passwordRef} data-testid="password"/>
                </div>
                <button className="login__submit form__submit button" type="submit" data-testid="login-submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <LocationBtn city={city}/>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
