'use strict'

// class Player {
//     constructor() {

//     }
// }




const board = document.querySelector('.board__container')
const boardField = document.querySelectorAll('.board__item')


let fieldsSelected = ['', '', ''];



const addImage = function(e) {
    const html = `
        <img src='img/cross.svg' alt='image'>
    `;
    e.target.insertAdjacentHTML('afterbegin', html)
}

const selectBoardField = function(e) {
    console.log(e.target.dataset.number);
    const selectedField = e.target.dataset.number;
    fieldsSelected[0] = selectedField;
    console.log(fieldsSelected);
    addImage(e)
}


board.addEventListener('click', selectBoardField)