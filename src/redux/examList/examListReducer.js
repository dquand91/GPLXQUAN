import {
  SET_LIST_8_GROUP_EXAM,
  SET_IS_FINISH_EXAM,
  SET_REFRESH_FINISH_EXAM,
  SET_CORRECT_ANSWER_LIST,
} from './types';

// item of this array get from RandomQuestionUtils.js
//list8GroupExam: [
//   {
//     id: 0,
//     title: '',
//     indexQuestionList: [],
//     correctList: [],
//     isFinish: false,
//   },
// ],
const initState = {
  list8GroupExam: [],
};

export default function setList8GroupExam(state = initState, action) {
  // console.log('Reducer setList8GroupExam action', action);
  switch (action.type) {
    case SET_LIST_8_GROUP_EXAM:
      return {
        ...state,
        list8GroupExam: action.actionPayload.listGroupExam,
      };
    case SET_IS_FINISH_EXAM:
      return {
        ...state,
        list8GroupExam: state.list8GroupExam.map(e => {
          if (e.id !== action.actionPayload.item.id) {
            return e;
          } else {
            return Object.assign(e, {isFinish: action.actionPayload.isFinish});
          }
        }),
      };
    case SET_REFRESH_FINISH_EXAM:
      return {
        list8GroupExam: state.list8GroupExam.map(e => {
          return Object.assign(e, {isFinish: false, correctList: []});
        }),
      };
    case SET_CORRECT_ANSWER_LIST:
      return {
        list8GroupExam: state.list8GroupExam.map(e => {
          console.log('*****REDUCER SET_CORRECT_ANSWER_LIST e', e);
          console.log(
            '*****REDUCER SET_CORRECT_ANSWER_LIST action.actionPayload',
            action.actionPayload,
          );
          if (e.id !== action.actionPayload.groupExamId) {
            return e;
          } else {
            return Object.assign(e, {
              correctList: action.actionPayload.listCorrectAnswer,
            });
          }
        }),
      };
    default:
      return state;
  }
}
