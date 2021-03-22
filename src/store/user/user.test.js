import {AuthorizationStatus, avatarPlaceholder} from "../../const";
import {changeUserAvatar, changeUserName, requiredAuthorization, setErrorMessage} from "../action";
import {user} from "./user";

describe(`Reducers work correctly`, () => {
  it(`Reducer with no additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userName: ``,
        avatarUrl: avatarPlaceholder,
        errorMessage: ``
      });
  });

  it(`Reducer should change user name`, () => {
    const state = {userName: ``, avatarUrl: avatarPlaceholder};

    expect(user(state, changeUserName(`Kirill`)))
      .toEqual({
        userName: `Kirill`,
        avatarUrl: avatarPlaceholder
      });
  });

  it(`Reducer should change authorization status`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};

    expect(user(state, requiredAuthorization(`AUTH`)))
      .toEqual({
        authorizationStatus: `AUTH`,
      });
  });

  it(`Reducer should change user avatar`, () => {
    const state = {userName: `Kirill`, avatarUrl: avatarPlaceholder};

    expect(user(state, changeUserAvatar(`image/avatar.jpg`)))
      .toEqual({
        userName: `Kirill`,
        avatarUrl: `image/avatar.jpg`,
      });
  });

  it(`Reducer should change error message type from number to string and then set the message`, () => {
    const state = {avatarUrl: avatarPlaceholder, errorMessage: ``};

    expect(user(state, setErrorMessage(404)))
      .toEqual({
        avatarUrl: avatarPlaceholder,
        errorMessage: `404`,
      });
  });
});
