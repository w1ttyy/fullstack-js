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

  const checkWin = (mark) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] === mark;
      });
    });
  };

  const isFull = () => {
    if (!board.includes("")) {
      return true;
    } else {
      return false;
    }
  };

  return { getBoard, placeMark, reset, checkWin, isFull };
})();

const createPlayer = (name, mark) => {
  return { name, mark };
};

const GameController = (function () {
  const player1 = createPlayer("Player 1", "O");
  const player2 = createPlayer("Player 2", "X");

  let inTurn = player1;
  let result = null;

  const getActivePlayer = () => inTurn;

  const playRound = (index) => {
    if (result !== null) {
      return;
    }

    if (Gameboard.placeMark(index, inTurn.mark)) {
      if (Gameboard.checkWin(inTurn.mark)) {
        result = `${inTurn.name} wins`;
      } else if (Gameboard.isFull()) {
        result = "Tie";
      } else {
        inTurn = inTurn === player1 ? player2 : player1;
      }
    }
  };

  const getResult = () => result;

  const restart = () => {
    inTurn = player1;
    result = null;
    Gameboard.reset();
  };

  return { getActivePlayer, playRound, getResult, restart };
})();

const DisplayController = (function () {
  const boardButtons = document.querySelectorAll(".cell");
  const statusP = document.querySelector("#status");
  const restartButton = document.querySelector("#restart-button");

  const render = () => {
    const boardState = Gameboard.getBoard();

    boardButtons.forEach((button, index) => {
      button.textContent = boardState[index];
    });
    if (GameController.getResult() === null) {
      statusP.textContent = "In turn: " + GameController.getActivePlayer().name;
    } else {
      statusP.textContent = GameController.getResult();
    }
  };

  boardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cellIndex = Number(button.dataset.index);
      GameController.playRound(cellIndex);
      render();
    });
  });

  restartButton.addEventListener("click", () => {
    GameController.restart();
    render();
  });

  render();

  return { render };
})();
