import {
  SET_LIST_CHOSEN_EXAM_QUESTION,
  SET_CURRENT_EXAM_QUESTION,
  SET_IS_SHOW_ANSWER,
} from './types';

const initState = {
  chosenAnswerList: [],
  currentQuestion: null,
  showAnswer: false,
  // curentChosen: [],
};

export default function setExamQuestion(state = initState, action) {
  console.log('Reducer setExamQuestion action', action);
  switch (action.type) {
    case SET_LIST_CHOSEN_EXAM_QUESTION:
      return {
        ...state,
        chosenAnswerList: action.actionPayload.chosenAnswer,
      };
    case SET_CURRENT_EXAM_QUESTION:
      return {...state, currentQuestion: action.actionPayload.currentQuestion};
    case SET_IS_SHOW_ANSWER:
      return {...state, showAnswer: action.actionPayload.showAnswer};
    default:
      return state;
  }
}
