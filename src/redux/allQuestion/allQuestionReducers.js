import {SET_CURRENT_ALL_QUESTION} from './types';

const initState = {
  currentQuestion: null,
};

export default function setCurrentAllQuestion(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_ALL_QUESTION:
      // console.log(
      //   'Reducer setCurrentAllQuestion actionPayload',
      //   action.actionPayload,
      // );
      return {...state, currentQuestion: action.actionPayload.currentQuestion};
    default:
      return state;
  }
}
