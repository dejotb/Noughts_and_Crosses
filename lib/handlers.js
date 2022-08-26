import { activePlayer, clearData, selectBoardField } from './index.js';
import { modal, board } from '../data/DOM-elements.js';

//= =========================================================================
// Show modal with information about a winner
//= =========================================================================

export const showWinModal = function () {
  const html = `
        <p>${activePlayer.playerName} won!</p>
      `;
  modal.insertAdjacentHTML('afterbegin', html);
  modal.classList.remove('hidden');
};

//= =========================================================================
// Show modal with information about a draw
//= =========================================================================

export const showDrawModal = function () {
  const html = `
        <p>We have a draw!</p>
      `;
  modal.insertAdjacentHTML('afterbegin', html);
  modal.classList.remove('hidden');
};

//= =========================================================================
// Show modal and create event to clear data on click after win/draw game
//= =========================================================================

export const handleOnWinOrDraw = function () {
  board.removeEventListener('click', selectBoardField);
  document
    .querySelector('#btn__next-round')
    .addEventListener('click', clearData);
};

//= =========================================================================
// Add cross/circle image to the board grid
//= =========================================================================

export const addImage = function (e, player) {
  const html = `
                <img class='image' src='${player.image}' alt=''>
            `;
  if (e.target.classList.contains('board__item')) {
    e.target.insertAdjacentHTML('afterbegin', html);
    e.target.querySelector('.image').classList.add('imageEnter');
  }
};
