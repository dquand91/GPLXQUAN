import {
  SET_LIST_ANSWER_RESULT,
  SET_LIST_QUESTION_RESULT,
  SET_TIME_DO_EXAM,
} from './types';

export const setListAnswerResult = answer => {
  return dispatch => {
    dispatch({
      type: SET_LIST_ANSWER_RESULT,
      actionPayload: {
        listAnswer: answer,
      },
    });
  };
};

export const setListQuestionResult = question => {
  return dispatch => {
    dispatch({
      type: SET_LIST_QUESTION_RESULT,
      actionPayload: {
        listQuestion: question,
      },
    });
  };
};

export const setTimeResult = time => {
  return dispatch => {
    dispatch({
      type: SET_TIME_DO_EXAM,
      actionPayload: {
        time: time,
      },
    });
  };
};

// export const setCurrentChosen = chosenAsnwer => {
//   return dispatch => {
//     dispatch({
//       type: SET_CURRENT_CHOSEN_ANSWER,
//       actionPayload:{
//         currentChosenAnswer: chosenAsnwer,
//       },
//     });
//   };
// };
