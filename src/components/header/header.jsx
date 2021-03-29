import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';
import SignIn from './sign-in/sign-in';

const Header = () => {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={Routes.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} data-testid="header-logo"/>
            </Link>
          </div>
          <nav className="header__nav" data-testid="header-nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <SignIn />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
