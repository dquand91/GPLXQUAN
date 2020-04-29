import {SET_USERNAME} from './types';

const initState = {
  username: '',
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {...state, username: action.payload.username};
    default:
      return state;
  }
}
