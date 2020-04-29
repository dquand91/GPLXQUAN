import {SET_CURRENT_ALL_QUESTION} from './types';

export const setCurrentAllQuestion = question => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_ALL_QUESTION,
      actionPayload: {
        currentQuestion: question,
      },
    });
  };
};
