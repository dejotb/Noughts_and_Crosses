import Player from '../lib/player.js';

// Players

export const player1 = new Player('Player1', 'cross.4cbdff5e.svg', 1);
export const player2 = new Player('Player2', 'circle.5ca8fc71.svg', 2);

// Select board classes

export const board = document.querySelector('.board__container');
export const boardFields = document.querySelectorAll('.board__item');
export const playersScore = document.querySelectorAll('.score__total');
export const modal = document.querySelector('.modal__container');

// Select button id

export const btnReset = document.querySelector('#btn__reset-score');

// Select Referee classes

export const mouthOpen = document.querySelector('.mouth__open');
export const eyes = document.querySelectorAll('.eyes');
export const handLeft = document.querySelector('.hand__left');
export const handRight = document.querySelector('.hand__right');
