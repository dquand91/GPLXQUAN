import {
  SET_LIST_CHOSEN_EXAM_QUESTION,
  SET_CURRENT_EXAM_QUESTION,
  SET_IS_SHOW_ANSWER,
  // SET_CURRENT_CHOSEN_ANSWER,
} from './types';

export const setListChosenExamQuestion = answer => {
  return dispatch => {
    dispatch({
      type: SET_LIST_CHOSEN_EXAM_QUESTION,
      actionPayload: {
        chosenAnswer: answer,
      },
    });
  };
};

export const setCurrentExamQuestion = question => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_EXAM_QUESTION,
      actionPayload: {
        currentQuestion: question,
      },
    });
  };
};

export const setShowAnswer = isShowAnswer => {
  return dispatch => {
    dispatch({
      type: SET_IS_SHOW_ANSWER,
      actionPayload: {
        showAnswer: isShowAnswer,
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
