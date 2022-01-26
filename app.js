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



const playerOneSelections = [4,1,5];

const boardGrid = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
    ];


const containsAll = boardGrid.map(arr => arr.every(el => {
    return playerOneSelections.includes(el);
}));

console.log(containsAll);
console.log(containsAll.some(el => el === true));

// const containsAll = arr1.every(element => {
//     return arr2.includes(element);
// });


console.log(boardGrid);
