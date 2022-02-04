
// Creates players blueprint

class Player {
  constructor(player, image, playerId) {
    this.playerName = player;
    this.playerNumber = playerId
    this.image = image;
    this.allFieldsSelected = [];
    this.playerScore = 0;
  }
}

const play = function () {

// Creates a grid of all winning combinations

  const boardGridWinCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Creates players

  const player1 = new Player('Player1', 'cross.svg', 1);
  const player2 = new Player('Player2', 'circle.svg', 2);

  // Select board classes

  const board = document.querySelector('.board__container');
  const boardFields = document.querySelectorAll('.board__item');
  const playersScore = document.querySelectorAll('.score__total');
  const modal = document.querySelector('.modal__container');


  // Select Referee classes

  const mouthOpen = document.querySelector('.mouth__open');
  const eyes = document.querySelectorAll('.eyes');
  const handLeft = document.querySelector('.hand__left');
  const handRight = document.querySelector('.hand__right');

  // Creates an array of players

  const players = [player1, player2];

  // The active player
  let activePlayer = '';

  // Current round

  let roundNr = 1;


  let playerTurn = 1;

  // let startingPlayerCount = 0;

  let drawScore = 0;

// ==========================================================================
// handles board grid on click / on keyDown
// ==========================================================================

  const selectBoardFieldOnClick = function (e) {

    if (e.target.classList.contains('board__item')) {
      selectBoardField(e);

    }
  };

  const selectBoardFieldOnKeyDown = function (e) {
    if (e.target.classList.contains('board__item') && e.key === 'Enter') {
      selectBoardField(e);

    }
  };


  const selectBoardField = function (e) {
      if (playerTurn % 2) {
        activePlayer = players[0];
        document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__total').style.opacity = '0.5';

      } else {
        activePlayer = players[1];
        document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__total').style.opacity = '0.5';
      }


      // adds a number to active players array based on clicked field
      const fieldSelected = e.target.dataset.number;
      activePlayer.allFieldsSelected.push(parseInt(fieldSelected));
      addImage(e, activePlayer);
      playersScore.forEach(el => el.style.opacity = '1');
      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__total').style.opacity = '0.5';
      e.target.style.pointerEvents = 'none';
      e.target.removeEventListener('keydown', selectBoardFieldOnKeyDown);
      e.target.tabIndex= '-1';
      checkResult(activePlayer);
      roundNr++;
      playerTurn++

  };


//==========================================================================
// Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGridWinCombinations" variable). Shows wether active player won/lost, or there is a draw
//==========================================================================

  const checkResult = function(player) {

    const containsAll = boardGridWinCombinations.filter((arr) =>
      arr.every((el) => player.allFieldsSelected.includes(el))
    );

    // If player WON

    if(containsAll.some((el) => el)) {
      setTimeout(showWinModal, 1500);
      addPointtoPlayer(player);
      animateWinner(containsAll);
      handleOnWinOrDraw();

      // if it is a DRAW

    } else if (roundNr === 9) {
      setTimeout(showDrawModal, 1500);
      addPointtoTie();
      handleOnWinOrDraw();
      board.classList.add('draw');
    }

  };

//==========================================================================
// Clear data and classes on next round
//==========================================================================

  const clearData = function() {
    roundNr = 1;
    playerTurn+=2;

    // board clearance
    modal.classList.add('hidden');
    board.querySelectorAll('.board__item').forEach(item => item.textContent = '');
    players.forEach(el => el.allFieldsSelected = []);
    boardFields.forEach(el => el.style.pointerEvents = 'all');
    board.classList.remove('draw');
    document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__total').style.opacity = '0.5';
    modal.innerHTML = '<button>next round!</button>';
    [...board.children].forEach(el => el.tabIndex = '0');

    board.addEventListener('click', selectBoardFieldOnClick);
    [...board.children].forEach(el => el.addEventListener('keydown', selectBoardFieldOnKeyDown));

    // Referee classes clearance
    handRight.classList.remove('hand__right-animation');
    handLeft.classList.remove('hand__left-animation');
    mouthOpen.classList.remove('mouth__open-animation');
    eyes.forEach(eye => eye.classList.add('eyes-animation'));

  }

  //==========================================================================
  // Add cross/circle image to the board grid
  //==========================================================================

  const addImage = function (e, player) {
    const html = `
            <img class='image' src='img/${player.image}' alt='image'>
        `;
    if (e.target.classList.contains('board__item')) {
      e.target.insertAdjacentHTML('afterbegin', html);
      e.target.querySelector('.image').classList.add('imageEnter');
    }

  };

//==========================================================================
  // Show modal with information about a win
//==========================================================================

  const showWinModal = function() {
    const html = `
      <p>${activePlayer.playerName} won!</p>
    `
    modal.insertAdjacentHTML('afterbegin', html);
    modal.classList.remove('hidden');
  }

//==========================================================================
  // Show modal with information about a draw
//==========================================================================

  const showDrawModal = function() {
    const html = `
      <p>We have a draw!</p>
    `
    modal.insertAdjacentHTML('afterbegin', html);
    modal.classList.remove('hidden');
  }

//==========================================================================
  // Animation of winning combination
//==========================================================================

  const animateWinner = function(winningCombination) {

    //animate board

    boardFields.forEach(el => el.style.pointerEvents = 'none');
    const winnerDOMFields =  winningCombination[0].map(
      element => element = document.querySelector(`[data-number='${element}'] img`)
    );
    winnerDOMFields.forEach(el => el.classList.add('winner'));

    // animate referee

    mouthOpen.classList.add('mouth__open-animation');
    eyes.forEach(eye => eye.classList.remove('eyes-animation'));

    if (activePlayer === players[0]) {
      handLeft.classList.add('hand__left-animation');
    } else if (activePlayer === players[1]) {
      handRight.classList.add('hand__right-animation');

    };
    // highlight winner score board
      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__total').style.opacity = '1';
  }

//==========================================================================
  // Show modal and create event to clear data on click after win/draw game
//==========================================================================

  const handleOnWinOrDraw = function() {
    board.removeEventListener('click', selectBoardField);
    document.querySelector('button').addEventListener('click', clearData);
    [...board.children].forEach(el => el.tabIndex = '-1');
  }

//==========================================================================
  // Adds point to player's score after a win
//==========================================================================

  const addPointtoPlayer = function(player) {
    player.playerScore+=1;
    document.querySelector(`[data-id='${player.playerNumber}']`).innerHTML = player.playerScore;
  }

//==========================================================================
  // Adds point to draw score
//==========================================================================

  const addPointtoTie = function() {
    drawScore++;
    document.querySelector(`[data-id='0']`).innerHTML = drawScore;
  }


  board.addEventListener('click', selectBoardFieldOnClick);

  [...board.children].forEach(el => el.addEventListener('keydown', selectBoardFieldOnKeyDown));


};

//==========================================================================
// Run all functions
//==========================================================================
play();

