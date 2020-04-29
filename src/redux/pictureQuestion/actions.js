import {SET_CURRENT_PICTURE_QUESTION} from './types';

export const setCurrentPictureQuestion = question => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_PICTURE_QUESTION,
      actionPayload: {
        currentQuestion: question,
      },
    });
  };
};
