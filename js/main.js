
//Negate right click effect on page
// document.addEventListener('contextmenu', event => event.preventDefault());

const gameContainer = document.querySelector('.game-container');

// ----- GAME CONST -----
//Row
const boardSmallRow = 10;
const boardMediumRow = 15;
const boardLargeRow = 25;
//col
const boardSmallCol = 10;
const boardMediumCol = 15;
const boardLargeCol = 16;

// ----- GAME VARIABLE -----
let row = boardSmallRow;
let col = boardSmallCol;

addGridTemplateCol();
generateBoard();
iniBtnPlay();
iniSizeSelector();
getBoardSize();


let mineField = [];




//----------------------// 
//                      //
//      FUNCTIONS       //
//                      //
//----------------------//

function addGridTemplateCol() {
    gameContainer.removeAttribute('style');
    gameContainer.setAttribute('style', 'grid-template-columns: repeat(' + col.toString() + ' , 1fr);');
}

function resetBoard() {
    gameContainer.innerHTML = '';
}

function generateBoard() {

    resetBoard();
    addGridTemplateCol();

    let c = 1; //debug
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const cell = document.createElement('button');
            cell.classList.add('box');
            cell.innerText = c++; //debug
            gameContainer.append(cell);
        }
    }
}

// PLAY BUTTON
function iniBtnPlay() {
    const btnPlay = document.getElementById('play');
    btnPlay.addEventListener('click', function () {
        generateBoard();
    });
}

// SIZE SELECTOR
function iniSizeSelector() {
    const selectorSize = document.getElementById('size-select');
    selectorSize.addEventListener('change', function () {
        switch (selectorSize.value) {
            case 'small':
                row = boardSmallRow;
                col = boardSmallCol;
                break;
            case 'medium':
                row = boardMediumRow;
                col = boardMediumCol;
                break;
            case 'large':
                row = boardLargeRow;
                col = boardLargeCol;
                break;
        }
    });
}

// for (let i = 0; i < row; i++) {
//     MineField[i] = [];
//     for (let j = 0; j < col; j++) {
//         MineField[i][j] = 0;

//     }
// }