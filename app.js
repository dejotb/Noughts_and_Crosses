
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
  const playersScore = document.querySelectorAll('.score__player');

  // Creates players

  const player1 = new Player('Player One', 'cross.svg', 1);
  const player2 = new Player('Player Two', 'circle.jpg', 2);


  // Creates an array of players

  const players = [player1, player2];

  // The active player
  let activePlayer = '';

  // Current round

  let roundNr = 1;


  let playerTun = 1;

  // let startingPlayerCount = 0;

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
    playerTun++
    // startingPlayerCount++;

  }

 // Addes point to players score after a win

  const addPointtoPlayer = function(player) {
    player.playerScore+=1;
    document.querySelector(`[data-id='${player.playerNumber}']`).innerHTML = player.playerScore;
  }


  const addPointtoTie = function() {
    drawScore++;
    document.querySelector(`[data-id='0']`).innerHTML = drawScore;

  }

  // Compares the active player's all fields selected ('allFieldsSelected' variable) with the winning combinations grid ("boardGrid" variable).
  // Shows wether active player won/lost, or there is a draw

  const checkResult = function(player) {

  const containsAll = boardGrid.map((arr) =>
    arr.every((el) => player.allFieldsSelected.includes(el))
  );

  if(containsAll.some((el) => el)) {
    alert(`${player.playerName} WON!!!`);
    addPointtoPlayer(player);
    clearData();
    console.log(playerTun);


  } else if (roundNr === 10) {
    alert('we have a tie game!!');
    addPointtoTie();
    clearData();

    console.log(playerTun);


  }

  };

  const selectBoardField = function (e) {
    if (playerTun % 2) {
      activePlayer = players[0];
      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__player').style.opacity = '0.5';
    } else {
      activePlayer = players[1];
      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__player').style.opacity = '0.5';
    }


    if (e.target.classList.contains('board__item')) {

      const fieldSelected = e.target.dataset.number;
      activePlayer.allFieldsSelected.push(parseInt(fieldSelected));
      playersScore.forEach(el => el.style.opacity = '1');
      document.querySelector(`[data-id='0']`).closest('.score__player').style.opacity = '0.7';

      document.querySelector(`[data-id='${activePlayer.playerNumber}']`).closest('.score__player').style.opacity = '0.5';
      addImage(e, activePlayer);

      roundNr++;
      playerTun++
      checkResult(activePlayer)
    }
  };

  board.addEventListener('click', selectBoardField);

};

play();

