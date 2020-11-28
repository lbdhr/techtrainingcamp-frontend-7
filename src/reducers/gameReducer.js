import Board from '../gameReducers/board';

function getBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}
function getStatusBoard(size) {
  let statusBoard = [];
  for (let i = 0; i < size; i++) {
    statusBoard[i] = [];
    for (let j = 0; j < size; j++) {
      statusBoard[i][j] = {
        isMerged: false,
        isNew: false,
      };
    }
  }
  return statusBoard;
}

const initState = {
  board: JSON.parse(JSON.stringify(getBoard(4))),
  statusBoard: getStatusBoard(4),
  score: 0,
  bestScore: 0,
  gameOver: false,
  isMoved: true,
};
const initStateCopy = JSON.parse(JSON.stringify(initState));

// Actions
const INIT = 'INIT';
const ADD_RANDOM = 'ADD_RANDOM';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const RESET = 'RESET';

export default function gameReducer(state = initState, action) {
  let bd = new Board(state);
  switch (action.type) {
    case INIT: {
      if (action.board) {
        return { ...state, ...action.board };
      }
      bd.addRandomToBoard();
      const res = bd.addRandomToBoard(); // 加两个随机数
      return { ...state, ...res };
    }
    case ADD_RANDOM: {
      const res = bd.addRandomToBoard();
      return { ...state, ...res };
    }
    case MOVE_UP: {
      let statusBoard = getStatusBoard(4);
      const res = bd.move('up');
      return { ...state, ...res, ...statusBoard };
    }
    case MOVE_DOWN: {
      let statusBoard = getStatusBoard(4);
      const res = bd.move('down');
      return { ...state, ...res, ...statusBoard };
    }
    case MOVE_LEFT: {
      let statusBoard = getStatusBoard(4);
      const res = bd.move('left');
      return { ...state, ...res, ...statusBoard };
    }
    case MOVE_RIGHT: {
      let statusBoard = getStatusBoard(4);
      const res = bd.move('right');
      return { ...state, ...res, ...statusBoard };
    }
    case RESET: {
      const tmp = initStateCopy;
      bd = new Board(tmp);
      bd.addRandomToBoard();
      const res = bd.addRandomToBoard();
      return { ...tmp, ...res, bestScore: state.bestScore };
    }
    default: {
      return state;
    }
  }
}

export const initBoard = board => ({
  type: INIT,
  board,
});

const actionCreator = type => {
  return () => ({ type });
};
export const addRandom = actionCreator(ADD_RANDOM);
export const moveUp = actionCreator(MOVE_UP);
export const moveDown = actionCreator(MOVE_DOWN);
export const moveLeft = actionCreator(MOVE_LEFT);
export const moveRight = actionCreator(MOVE_RIGHT);
export const reset = actionCreator(RESET);
