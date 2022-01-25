'use strict'

// class Player {
//     constructor() {

//     }
// }




const board = document.querySelector('.board__container')
const boardField = document.querySelectorAll('.board__item')


let fieldsSelected = ['', '', ''];

const player1 = 0;
const player2 = 1;

let activePlayer = player1;


const addImage = function(e) {
    const html = `
        <img src='img/cross.svg' alt='image'>
    `;
    if (e.target.classList.contains('board__item'))
    e.target.insertAdjacentHTML('afterbegin', html)
}

const selectBoardField = function(e) {
    if (e.target.classList.contains('board__item')) {
        const selectedField = e.target.dataset.number;
        fieldsSelected[0] = selectedField;
        console.log(fieldsSelected);
        addImage(e)
    }

}


board.addEventListener('click', selectBoardField)