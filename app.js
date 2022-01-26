
// Creates players blueprint

class Player {
  constructor(player, image) {
    this.player = player;
    this.image = image;
    this.allFieldsSelected = [];
  }
}

const play = function () {

  // Creates a grid of all winning combinations

  const boardGrid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Select class from HTML

  const board = document.querySelector('.board__container');


  // Creates players

  const player1 = new Player('Player One', 'cross.svg');
  const player2 = new Player('Player Two', 'circle.jpg');


  // Creates an array of players

  const players = [player1, player2];

  // Shows the active player
  let activePlayer = players[0];

  // Shows current round

  let roundNr = 1;

  // Function to add cross/circle image in the board grid

  const addImage = function (e, player) {
    const html = `
            <img src='img/${player.image}' alt='image'>
        `;
    if (e.target.classList.contains('board__item'))
      e.target.insertAdjacentHTML('afterbegin', html);
  };


  // Adds a round

  const addRound = function () {

    return roundNr++;
  };


  const clearData = function() {
    board.querySelectorAll('.board__item').forEach(item => item.textContent = '');
    player1.allFieldsSelected = [];
    player2.allFieldsSelected = [];
    roundNr = 1;
    console.log(player1.allFieldsSelected);
    console.log(player2.allFieldsSelected);
  }

  // Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGrid" variable).
  // Shows wether active player won/lost, or there is a draw

  const checkResult = function(player) {

  const containsAll = boardGrid.map((arr) =>
    arr.every((el) => player.allFieldsSelected.includes(el))
  );
  // console.log(boardGrid);
  // console.log(containsAll);
  // console.log(containsAll.some((el) => el === true));

  if(containsAll.some((el) => el)) {
    alert(`${player.player} WON!!!`);
    clearData()
  } else if (roundNr === 10) {
    alert('we have a tie game!!');
    clearData()
  }

  }

  const selectBoardField = function (e) {
    if (roundNr % 2) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    if (e.target.classList.contains('board__item')) {
      const fieldSelected = e.target.dataset.number;
      activePlayer.allFieldsSelected.push(parseInt(fieldSelected));
      // console.log(activePlayer.allFieldsSelected);
      addImage(e, activePlayer);
      addRound();
      console.log(roundNr);
      checkResult(activePlayer)
    }
  };

  board.addEventListener('click', selectBoardField);

};

play();
