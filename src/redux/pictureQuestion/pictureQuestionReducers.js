import {SET_CURRENT_PICTURE_QUESTION} from './types';

const initState = {
  currentQuestion: null,
};

export default function setCurrentPictureQuestion(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_PICTURE_QUESTION:
      // console.log(
      //   'Reducer setCurrentPictureQuestion actionPayload',
      //   action.actionPayload,
      // );
      return {...state, currentQuestion: action.actionPayload.currentQuestion};
    default:
      return state;
  }
}
