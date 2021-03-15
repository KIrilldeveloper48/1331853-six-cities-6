import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LocationBtn from '../../components/common/location-btn';
import Header from '../../components/header/header';
import {login} from '../../store/api-actions';

const Login = () => {
  const {city} = useSelector((state) => state.MAIN);
  const dispatch = useDispatch();

  const loginRef = useRef();
  const passwordRef = useRef();

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
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={loginRef}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={passwordRef}/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
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
