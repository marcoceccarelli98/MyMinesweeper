
//Negate right click effect on page
// document.addEventListener('contextmenu', event => event.preventDefault());

const gameContainer = document.querySelector('.game-container');

const row = 20;
const col = 10;

addGridTemplateCol(col);

let mineField = [];

let c = 1;
for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        const cell = document.createElement('button');
        cell.classList.add('box');
        cell.innerText = c++;
        gameContainer.append(cell);
    }
}


//----------------------// 
//                      //
//      FUNCTIONS       //
//                      //
//----------------------//

function addGridTemplateCol(col) {
    gameContainer.setAttribute('style', 'grid-template-columns: repeat(' + col.toString() + ' , 1fr);');
}





// for (let i = 0; i < row; i++) {
//     MineField[i] = [];
//     for (let j = 0; j < col; j++) {
//         MineField[i][j] = 0;

//     }
// }