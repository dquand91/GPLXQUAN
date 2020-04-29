import {SET_WRONG_ANSWER, SET_CURRENT_WRONG_QUESTION} from './types';

const initState = {
  wrongAnswersList: [],
  currentQuestion: null,
};

export default function setWrongAnswers(state = initState, action) {
  // console.log('Reducer setWrongAnswers action', action);
  switch (action.type) {
    case SET_WRONG_ANSWER:
      return {...state, wrongAnswersList: action.actionPayload.wrongAnswerList};
    case SET_CURRENT_WRONG_QUESTION:
      return {...state, currentQuestion: action.actionPayload.currentQuestion};
    default:
      return state;
  }
}
