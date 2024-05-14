
//Negate right click effect on page
// document.addEventListener('contextmenu', event => event.preventDefault());

const gameContainer = document.querySelector('.game-container');
const selectorSize = document.getElementById('size-select');

// ----- GAME CONST -----
//Row
const boardSmallRow = 10;
const boardMediumRow = 15;
const boardLargeRow = 25;
//col
const boardSmallCol = 10;
const boardMediumCol = 15;
const boardLargeCol = 16;

const mineField = [];
const mines = [];

// ----- GAME VARIABLE -----
let row = boardSmallRow;
let col = boardSmallCol;

//----------------------// 
//                      //
//      MAIN GAME       //
//                      //
//----------------------//

// Initialization
iniRowColSize();
iniBtnPlay();
iniSizeSelector();
iniScreenResize();


addGridTemplateCol();
generateBoard();
newMineField();


//----------------------// 
//                      //
//      FUNCTIONS       //
//                      //
//----------------------//

//----------------
// Initialization
//----------------

function iniScreenResize() {
    window.addEventListener('resize', function () {
        // Here's the code to execute when the window is resized
        const cell = document.querySelectorAll('.box');

        cell.forEach(function (cell) {
            resizeCells(cell, cellDim());
        });
    });
}

// Row and Col value initialization on first start and refresh
function iniRowColSize() {
    getBoardSize(selectorSize.value);
}

// PLAY BUTTON
function iniBtnPlay() {
    const btnPlay = document.getElementById('play');
    btnPlay.addEventListener('click', function () {
        generateBoard();
        newMineField();
    });
}

// SIZE SELECTOR
function iniSizeSelector() {
    const selectorSize = document.getElementById('size-select');
    selectorSize.addEventListener('change', function () {
        getBoardSize(selectorSize.value);
    });
}

//----------------
//     Board
//----------------

function getBoardSize(size) {
    switch (size) {
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
}

function addGridTemplateCol() {
    gameContainer.style.gridTemplateColumns = `repeat(${col.toString()}, 1fr)`;
}

function cellDim() {
    let attribute = '';
    if (window.innerWidth <= 500) {
        attribute = `width : calc(100vw / ${col} - 2px)`;
        return attribute
    } else if (window.innerWidth > 500 && window.innerWidth < 1200) {
        attribute = `width : calc(100vw / ${col} - 20px)`;
        return attribute
    } else {
        attribute = `width : calc(100vh / ${row} - 5px)`;
        return attribute
    }
}

function resizeCells(cell, attribute) {
    cell.removeAttribute('style');
    cell.setAttribute('style', attribute);
}

function resetBoard() {
    gameContainer.innerHTML = '';
}

function generateBoard() {

    resetBoard();
    addGridTemplateCol();

    let c = 1; //--debug
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const cell = document.createElement('button');
            cell.classList.add('box');
            cell.dataset.row = `${i}`;
            cell.dataset.col = `${j}`;
            resizeCells(cell, cellDim());
            gameContainer.append(cell);
        }
    }
    gameContainer.addEventListener('click', function (e) {
        revealBox(e);

    });
}

function revealBox(e) {
    if (mineField[e.target.dataset.row][e.target.dataset.col]) {
        console.log('Mine');
    } else {
        console.log('FREE');
    }
}

//----------------
//     Game
//----------------

function newMineField() {
    minesGenerator(3);
    for (let i = 0; i < row; i++) {
        mineField[i] = [];
        for (let j = 0; j < col; j++) {
            for (let c = 0; c < mines.length; c++) {
                if (checkIfMine(mines[c], [i, j])) {
                    mineField[i][j] = 1;
                    break;
                } else {
                    mineField[i][j] = 0;
                }
            }
        }
    }
}

function minesGenerator(minesNum) {
    for (let i = 0; i < minesNum; i++) {
        mines[i] = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)];
    }
    console.log(mines);
}

function checkIfMine(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.every((value, index) => value === array2[index]);
}



