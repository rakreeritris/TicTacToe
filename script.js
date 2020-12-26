let circleTurn;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
console.log(cellElements)
let Board = document.getElementById('board');
cellElements.forEach(cell => {
    cell.addEventListener('click', handleclick, { once: true });
})
const winningMessageTextElement = document.querySelector('[data-winning-message-test]');
const winningMessageElement = document.getElementById('winningMessage')
const restartButton=document.getElementById('restart');
startGame();
restartButton.addEventListener('click',startGame)
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick);
        cell.addEventListener('click', handleclick, { once: true });
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}
function handleclick(e) {   //Place Mark-done
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placemark(cell, currentClass);
    // check for win
    if (checkWin(currentClass)) {
        endgame(false);
    } else if (isDraw()) {
        endgame(true);
    }
    else {
        swapturns()
        setBoardHoverClass()

    }
    console.log('clicked');
};
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endgame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "DRAW !!"
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O ss" : "X ss"} WINS`;
    }
    winningMessageElement.classList.add('show');
}
function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapturns() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {
    Board.classList.remove(X_CLASS)
    Board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        Board.classList.add(CIRCLE_CLASS)
    }
    else {
        Board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
