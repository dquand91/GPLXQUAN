import {
  SET_LIST_ANSWER_RESULT,
  SET_LIST_QUESTION_RESULT,
  SET_TIME_DO_EXAM,
} from './types';

const initState = {
  listAnswer: [],
  listQuestion: [],
  time: '',
};

export default function setResultData(state = initState, action) {
  // console.log('Reducer setExamQuestion action', action);
  switch (action.type) {
    case SET_LIST_ANSWER_RESULT:
      return {
        ...state,
        listAnswer: action.actionPayload.listAnswer,
      };
    case SET_LIST_QUESTION_RESULT:
      return {...state, listQuestion: action.actionPayload.listQuestion};
    case SET_TIME_DO_EXAM:
      return {...state, time: action.actionPayload.time};
    default:
      return state;
  }
}
