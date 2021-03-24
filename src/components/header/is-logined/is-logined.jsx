import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, Routes} from './../../../const';

const IsLogined = () => {

  const {authorizationStatus, userName, avatarUrl} = useSelector((state) => state.USER);

  return (
    <Link className="header__nav-link header__nav-link--profile" to={Routes.FAVOR} data-testid="is-logined">
      <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `url(${avatarUrl})`}} data-testid="user-avatar">
      </div>
      <span className="header__user-name user__name">{authorizationStatus === AuthorizationStatus.AUTH ? userName : `Sign in`}</span>
    </Link>
  );
};

export default IsLogined;
