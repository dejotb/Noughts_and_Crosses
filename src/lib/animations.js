import {
  boardFields,
  mouthOpen,
  eyes,
  handLeft,
  handRight,
} from '../data/DOM-elements.js';
import { activePlayer } from './index.js';
import { players } from '../data/elements.js';

//= =========================================================================
// Animation of winning combination
//= =========================================================================

export const animateWinner = function (winningCombination) {
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
// Animate confetti
//= =========================================================================

export const fire = function (particleRatio, opts) {
  const count = 200;
  const defaults = {
    origin: { y: 0.55 },
  };
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
};
