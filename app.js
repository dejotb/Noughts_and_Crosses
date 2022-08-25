import { board, btnReset } from './data/DOM-elements.js';
import { selectBoardFieldOnClick, resetScores } from './lib/index.js';

board.addEventListener('click', selectBoardFieldOnClick);

btnReset.addEventListener('click', resetScores);
