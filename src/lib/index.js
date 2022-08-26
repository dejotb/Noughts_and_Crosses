import { players, boardGridWinCombinations } from '../data/elements.js';
import {
  playersScore,
  board,
  modal,
  boardFields,
  handLeft,
  handRight,
  mouthOpen,
  eyes,
} from '../data/DOM-elements.js';
import {
  showWinModal,
  showDrawModal,
  handleOnWinOrDraw,
  addImage,
} from './handlers.js';
import { animateWinner } from './animations.js';

// The active player

export let activePlayer = '';

// Current round

export let roundNr = 1;

export let playerTurn = 1;

export let drawScore = 0;

// ==========================================================================
// handles board grid
// ==========================================================================

export const selectBoardField = function (e) {
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

export const selectBoardFieldOnClick = function (e) {
  if (e.target.classList.contains('board__item')) {
    selectBoardField(e);
  }
};

//= =========================================================================
// Adds point to player's score after a win
//= =========================================================================

export const addPointtoPlayer = function (player) {
  player.playerScore += 1;
  document.querySelector(`[data-id='${player.playerNumber}']`).innerHTML =
    player.playerScore;
};

//= =========================================================================
// Adds point to draw score
//= =========================================================================

export const addPointtoTie = function () {
  drawScore++;
  document.querySelector(`[data-id='0']`).innerHTML = drawScore;
};

//= =========================================================================
// Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGridWinCombinations" variable). Shows wether active player won/lost, or there is a draw
//= =========================================================================

export const checkResult = function (player) {
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

export const clearData = function () {
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
// Resets a score
//= =========================================================================
export const resetScores = function () {
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
