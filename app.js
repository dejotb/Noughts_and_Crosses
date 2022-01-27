
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

  const player1 = new Player('Player One', 'cross.svg', 1);
  const player2 = new Player('Player Two', 'circle.jpg', 2);


  // Creates an array of players

  const players = [player1, player2];

  // The active player
  let activePlayer = players[0];

  // Current round

  let roundNr = 1;


  let drawScore = 0;

  // Add cross/circle image to the board grid

  const addImage = function (e, player) {
    const html = `
            <img src='img/${player.image}' alt='image'>
        `;
    if (e.target.classList.contains('board__item'))
      e.target.insertAdjacentHTML('afterbegin', html);
  };

  const clearData = function() {
    board.querySelectorAll('.board__item').forEach(item => item.textContent = '');
    player1.allFieldsSelected = [];
    player2.allFieldsSelected = [];
    roundNr = 1;
  }

 // Addes point to players score after a win

  const addPointtoPlayer = function(player) {
    player.playerScore+=1;
    document.querySelector(`[data-id='${player.playerNumber}']`).innerHTML = player.playerScore;
  }


  const addPointtoTie = function() {
    drawScore++;
    document.querySelector(`[data-id='0']`).innerHTML = drawScore;
    document.querySelector(`[data-id='0']`).style.opacity = '1';
  }

  // Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGrid" variable).
  // Shows wether active player won/lost, or there is a draw

  const checkResult = function(player) {

  const containsAll = boardGrid.map((arr) =>
    arr.every((el) => player.allFieldsSelected.includes(el))
  );

  if(containsAll.some((el) => el)) {
    alert(`${player.playerName} WON!!!`);
    addPointtoPlayer(player)
    clearData()
  } else if (roundNr === 10) {
    alert('we have a tie game!!');
    addPointtoTie();
    clearData();
  }

  };

  const selectBoardField = function (e) {
    if (roundNr % 2) {
      activePlayer = players[0];
    } else {
      activePlayer = players[1];
    }

    if (e.target.classList.contains('board__item')) {
      const fieldSelected = e.target.dataset.number;
      activePlayer.allFieldsSelected.push(parseInt(fieldSelected));
      document.querySelectorAll('.score__player').forEach(el => el.style.opacity = '0.5');

      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__player').style.opacity = '1'
      addImage(e, activePlayer);

      roundNr++;
      checkResult(activePlayer)
    }
  };

  board.addEventListener('click', selectBoardField);

};

play();

