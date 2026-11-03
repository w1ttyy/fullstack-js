const Gameboard = (function () {
  let board = Array(9).fill("");

  const getBoard = () => [...board];

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const reset = () => {
    board = Array(9).fill("");
  };

  return { getBoard, placeMark, reset };
})();

const createPlayer = (name, mark) => {
  return { name, mark };
};

const GameController = (function () {
  const player1 = createPlayer("Player 1", "O");
  const player2 = createPlayer("Player 2", "X");

  let inTurn = player1;

  const getActivePlayer = () => inTurn;

  const playRound = (index) => {
    if (Gameboard.placeMark(index, inTurn.mark)) {
      if (inTurn === player1) {
        inTurn = player2;
      } else {
        inTurn = player1;
      }
    }
  };

  return { getActivePlayer, playRound };
})();
