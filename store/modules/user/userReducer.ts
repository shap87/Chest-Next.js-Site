import {AnyAction} from 'redux';

type UserType = {
  username: string;
  name: string;
  uid: string
}

export interface UserState {
  user: UserType;
}

export const userReducer = (
  state: UserState = {user: {} as UserType},
  action: AnyAction,
) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, user: action.payload};
    default:
      return state;
  }
};
