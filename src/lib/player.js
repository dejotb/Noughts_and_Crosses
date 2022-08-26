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

export default Player;
