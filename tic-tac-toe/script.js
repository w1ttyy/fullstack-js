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
