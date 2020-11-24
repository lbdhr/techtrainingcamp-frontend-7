import { createStore } from 'redux';
import gameReducer from './reducer';
import undoable from 'redux-undo';

const initHistory = JSON.parse(localStorage.getItem('state') || 'null');
const args = [
  undoable(gameReducer, {
    ignoreInitialState: true,
    limit: 11,
  }),
];
if (initHistory) {
  args.push(initHistory);
}

const gameStore = createStore(...args);
gameStore.subscribe(() => {
  const state = gameStore.getState();
  localStorage.setItem('state', JSON.stringify(state));
});
export default gameStore;
