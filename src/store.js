import { createStore } from "redux";

export const actions = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  UNDO: "UNDO",
  REDO: "REDO",
};

const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: [],
};

function counter(state = initialState, action) {
  switch (action.type) {
    case actions.INCREMENT:
      return {
        currentValue: state.currentValue + action.amount,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues],
      };
    case actions.DECREMENT:
      return {
        currentValue: state.currentValue - action.amount,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues],
      };
    case actions.UNDO: 
      return {
          currentValue: state.previousValues[0],
          futureValues: [...state.currentValue, state.futureValues],
          previousValues: state.previousValues.slice(1)
        }
    case actions.REDO: 
      return {
          currentValue: state.futureValues[0],
          futureValues: state.futureValues.slice(1),
          previousValues: [...state.currentValue, state.previousValues]
      }

    default:
      return state;
  }
}

export default createStore(counter);
