const COLORS = {
    '1': 'BLUE',
    '-1': 'YELLOW',
    'null': 'white'
  };
  
  const winningS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ];
  
  let board
  let turn
  let winner
  

  const message = document.querySelector('h1');
  const playAgainButton = document.querySelector('button');
  
  document.getElementById('board').addEventListener('click', handleMove);
  playAgainButton.addEventListener('click', initialize);
  
  
  initialize();
  
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
   
    turn = 1;
    winner = null;
    render();
  }
  
  function handleMove(evt) {
    const idx = parseInt(evt.target.id.replace('sq-', ''));
    if (
      isNaN(idx) ||
      board[idx] ||
      winner
    ) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  function getWinner() {
    for (let winArr of winningS) {
      if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) return board[winArr[0]];
    }
    
    if (board.includes(null)) return null;
    return 'T';
  }
  
  function render() {
    renderBoard();
    renderMessage();

    playAgainButton.disabled = !winner;
  }
  
  function renderBoard() {
    board.forEach(function(sqVal, idx) {
      const squareEl = document.getElementById(`sq-${idx}`);
      squareEl.style.backgroundColor = COLORS[sqVal];
      squareEl.className = !sqVal ? 'avail' : '';
    });
  }
  
  function renderMessage() {
    if (winner === 'T') {
      message.innerHTML = 'its another tie🤪';
    } else if (winner) {
      message.innerHTML = `Congrats <span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span>!`;
    } else {
      message.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
  }
  