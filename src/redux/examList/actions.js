import {
  SET_LIST_8_GROUP_EXAM,
  SET_IS_FINISH_EXAM,
  SET_REFRESH_FINISH_EXAM,
  SET_CORRECT_ANSWER_LIST,
} from './types';

export const setList8GroupExam = listExam => {
  return dispatch => {
    dispatch({
      type: SET_LIST_8_GROUP_EXAM,
      actionPayload: {
        listGroupExam: listExam,
      },
    });
  };
};

export const setFinishExam = (item, isFinish) => {
  return dispatch => {
    dispatch({
      type: SET_IS_FINISH_EXAM,
      actionPayload: {
        item: item,
        isFinish: isFinish,
      },
    });
  };
};

export const refreshFinishExam = () => {
  return dispatch => {
    dispatch({
      type: SET_REFRESH_FINISH_EXAM,
      actionPayload: null,
    });
  };
};

export const setCorrectAnswerList = (groupExamId, listAnswer) => {
  return dispatch => {
    dispatch({
      type: SET_CORRECT_ANSWER_LIST,
      actionPayload: {
        groupExamId: groupExamId,
        listCorrectAnswer: listAnswer,
      },
    });
  };
};

// export const setCurrentExamQuestion = question => {
//   return dispatch => {
//     dispatch({
//       type: SET_CURRENT_EXAM_QUESTION,
//       actionPayload: {
//         currentQuestion: question,
//       },
//     });
//   };
// };

// export const setShowAnswer = isShowAnswer => {
//   return dispatch => {
//     dispatch({
//       type: SET_IS_SHOW_ANSWER,
//       actionPayload: {
//         showAnswer: isShowAnswer,
//       },
//     });
//   };
// };

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
