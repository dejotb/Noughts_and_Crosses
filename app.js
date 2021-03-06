// Creates players blueprint

class Player {
  constructor(player, image, playerId) {
    this.playerName = player;
    this.playerNumber = playerId;
    this.image = image;
    this.allFieldsSelected = [];
    this.playerScore = 0;
  }
}

const play = function () {
  // A grid of all winning combinations

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

  // Players

  const player1 = new Player('Player1', 'cross.svg', 1);
  const player2 = new Player('Player2', 'circle.svg', 2);

  // Select board classes

  const board = document.querySelector('.board__container');
  const boardFields = document.querySelectorAll('.board__item');
  const playersScore = document.querySelectorAll('.score__total');
  const modal = document.querySelector('.modal__container');

  // Select button id

  const btnReset = document.querySelector('#btn__reset-score');

  // Select Referee classes

  const mouthOpen = document.querySelector('.mouth__open');
  const eyes = document.querySelectorAll('.eyes');
  const handLeft = document.querySelector('.hand__left');
  const handRight = document.querySelector('.hand__right');

  // An array of players

  const players = [player1, player2];

  // The active player
  let activePlayer = '';

  // Current round

  let roundNr = 1;

  let playerTurn = 1;

  let drawScore = 0;

  // ==========================================================================
  // handles board grid on click / on keyDown
  // ==========================================================================

  const selectBoardFieldOnClick = function (e) {
    if (e.target.classList.contains('board__item')) {
      selectBoardField(e);
    }
  };

  const selectBoardField = function (e) {
    if (playerTurn % 2) {
      activePlayer = players[0];
      document
        .querySelector(`[data-id='${activePlayer.playerNumber}']`)
        .closest('.score__total').style.opacity = '0.5';
    } else {
      activePlayer = players[1];
      document
        .querySelector(`[data-id='${activePlayer.playerNumber}']`)
        .closest('.score__total').style.opacity = '0.5';
    }

    // adds a number to active players array based on the clicked field
    const fieldSelected = e.target.dataset.number;
    activePlayer.allFieldsSelected.push(parseInt(fieldSelected));
    playersScore.forEach((el) => (el.style.opacity = '1'));
    document
      .querySelector(`[data-id='${activePlayer.playerNumber}']`)
      .closest('.score__total').style.opacity = '0.5';
    e.target.style.pointerEvents = 'none';
    e.target.tabIndex = '-1';
    addImage(e, activePlayer);
    checkResult(activePlayer);
    roundNr++;
    playerTurn++;
  };

  //= =========================================================================
  // Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGridWinCombinations" variable). Shows wether active player won/lost, or there is a draw
  //= =========================================================================

  const checkResult = function (player) {
    const containsAll = boardGridWinCombinations.filter((arr) =>
      arr.every((el) => player.allFieldsSelected.includes(el))
    );

    // If player WON

    if (containsAll.some((el) => el)) {
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

  //= =========================================================================
  // Clear data and classes on a new round
  //= =========================================================================

  const clearData = function () {
    roundNr = 1;
    playerTurn += 2;

    // board clearance
    modal.classList.add('hidden');
    board
      .querySelectorAll('.board__item')
      .forEach((item) => (item.textContent = ''));
    players.forEach((el) => (el.allFieldsSelected = []));
    boardFields.forEach((el) => (el.style.pointerEvents = 'all'));
    board.classList.remove('draw');
    document
      .querySelector(`[data-id='${activePlayer.playerNumber}']`)
      .closest('.score__total').style.opacity = '0.5';
    modal.innerHTML = '<button id="btn__next-round">next round!</button>';

    board.addEventListener('click', selectBoardFieldOnClick);

    // Referee classes clearance
    handRight.classList.remove('hand__right-animation');
    handLeft.classList.remove('hand__left-animation');
    mouthOpen.classList.remove('mouth__open-animation');
    eyes.forEach((eye) => eye.classList.add('eyes-animation'));
  };

  //= =========================================================================
  // Add cross/circle image to the board grid
  //= =========================================================================

  const addImage = function (e, player) {
    const html = `
            <img class='image' src='img/${player.image}' alt=''>
        `;
    if (e.target.classList.contains('board__item')) {
      e.target.insertAdjacentHTML('afterbegin', html);
      e.target.querySelector('.image').classList.add('imageEnter');
    }
  };

  //= =========================================================================
  // Show modal with information about a winner
  //= =========================================================================

  const showWinModal = function () {
    const html = `
      <p>${activePlayer.playerName} won!</p>
    `;
    modal.insertAdjacentHTML('afterbegin', html);
    modal.classList.remove('hidden');
  };

  //= =========================================================================
  // Show modal with information about a draw
  //= =========================================================================

  const showDrawModal = function () {
    const html = `
      <p>We have a draw!</p>
    `;
    modal.insertAdjacentHTML('afterbegin', html);
    modal.classList.remove('hidden');
  };

  //= =========================================================================
  // Animation of winning combination
  //= =========================================================================

  const animateWinner = function (winningCombination) {
    // animate board

    boardFields.forEach((el) => (el.style.pointerEvents = 'none'));
    const winnerDOMFields = winningCombination[0].map(
      (element) =>
        (element = document.querySelector(`[data-number='${element}'] img`))
    );
    winnerDOMFields.forEach((el) => el.classList.add('winner'));

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 130,
      startVelocity: 45,
    });
    fire(0.1, {
      spread: 130,
      startVelocity: 45,
    });

    // animate referee

    mouthOpen.classList.add('mouth__open-animation');
    eyes.forEach((eye) => eye.classList.remove('eyes-animation'));

    if (activePlayer === players[0]) {
      handLeft.classList.add('hand__left-animation');
    } else if (activePlayer === players[1]) {
      handRight.classList.add('hand__right-animation');
    }

    // highlight winner score board
    document
      .querySelector(`[data-id='${activePlayer.playerNumber}']`)
      .closest('.score__total').style.opacity = '1';
  };

  //= =========================================================================
  // Show modal and create event to clear data on click after win/draw game
  //= =========================================================================

  const handleOnWinOrDraw = function () {
    board.removeEventListener('click', selectBoardField);
    document
      .querySelector('#btn__next-round')
      .addEventListener('click', clearData);
  };

  //= =========================================================================
  // Adds point to player's score after a win
  //= =========================================================================

  const addPointtoPlayer = function (player) {
    player.playerScore += 1;
    document.querySelector(`[data-id='${player.playerNumber}']`).innerHTML =
      player.playerScore;
  };

  //= =========================================================================
  // Adds point to draw score
  //= =========================================================================

  const addPointtoTie = function () {
    drawScore++;
    document.querySelector(`[data-id='0']`).innerHTML = drawScore;
  };

  board.addEventListener('click', selectBoardFieldOnClick);

  //= =========================================================================
  // Resets a score
  //= =========================================================================
  const resetScores = function () {
    const scores = document.querySelectorAll(`[data-id]`);
    players.map((player) => (player.playerScore = 0));
    scores.forEach((score) => (score.innerHTML = 0));
    board
      .querySelectorAll('.board__item')
      .forEach((item) => (item.textContent = ''));
    players.forEach((el) => (el.allFieldsSelected = []));
    boardFields.forEach((el) => (el.style.pointerEvents = 'all'));
    board.classList.remove('draw');
    roundNr = 1;
    drawScore = 0;
  };

  btnReset.addEventListener('click', resetScores);
};

//= =========================================================================
// Animate confetti
//= =========================================================================

function fire(particleRatio, opts) {
  const count = 200;
  const defaults = {
    origin: { y: 0.55 },
  };
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}

//= =========================================================================
// Run all functions
//= =========================================================================
play();
