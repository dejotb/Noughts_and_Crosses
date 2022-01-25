'use strict'

class Player {
    constructor(image) {
        this.image = image
    }
}




const board = document.querySelector('.board__container')
const boardField = document.querySelectorAll('.board__item')


let fieldsSelected = ['', '', ''];

const player1 = new Player ('cross.svg');
const player2 = new Player ('circle.jpg');

const players = [player1, player2];
let roundNr = 0


const addImage = function(e, player) {
    const html = `
        <img src='img/${player.image}' alt='image'>
    `;
    if (e.target.classList.contains('board__item'))
    e.target.insertAdjacentHTML('afterbegin', html)
}

const addRound = function() {
    return roundNr++;
}

const selectBoardField = function(e) {
    let activePlayer = players[0];
    if (roundNr % 2) {
        activePlayer = players[1]
    } else {
        activePlayer = players[0]
    };
    if (e.target.classList.contains('board__item')) {
        const selectedField = e.target.dataset.number;
        fieldsSelected[0] = selectedField;
        console.log(fieldsSelected);
        addImage(e, activePlayer);
        addRound()
        console.log(roundNr)
    }

}


board.addEventListener('click', selectBoardField)

