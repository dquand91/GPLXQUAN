import {SET_WRONG_ANSWER, SET_CURRENT_WRONG_QUESTION} from './types';

export const setWrongAnswers = wrongQuestions => {
  return dispatch => {
    dispatch({
      type: SET_WRONG_ANSWER,
      actionPayload: {
        wrongAnswerList: wrongQuestions,
      },
    });
  };
};

export const setCurrentWrongQuestion = question => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_WRONG_QUESTION,
      actionPayload: {
        currentQuestion: question,
      },
    });
  };
};
