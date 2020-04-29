import {SET_USERNAME} from './types';

export const setUsername = username => {
  console.log('Redux setUsername');
  return dispatch => {
    console.log('Redux dispatch');
    dispatch({
      type: SET_USERNAME,
      payload: {
        username: username,
      },
    });
  };
};
