import { createStore } from 'redux';

const reducer = function (state = 0, action) {
  switch (action.type) {
    case 'input':
      return action.value;
    case 'increase':
      return state + 1;
    case 'decrease':
      return state - 1;
    default:
      return state;
  }
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
})