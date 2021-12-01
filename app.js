// selectors
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('winning-message');
const restartButton = document.getElementById('reset-button');
const messageText = document.getElementById('winning-message-text');

// variables
var circle;
const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];  

// event listeners
board.classList.toggle('x');

function startGame(){
    circle =false;
    cellElements.forEach( (cell)=>{
        cell.classList.remove('x','circle');
        cell.addEventListener('click', handleClick,{once:true});
    });
    message.classList.remove('show');
}


restartButton.addEventListener('click',startGame);
// functions
function handleClick(e){
    // console.log(e.target.getAttribute('index'));
    const cell = e.target;
    currentMark = circle ? 'circle':'x';


    cell.classList.add(currentMark); // marking the cell 
    if (checkWin(currentMark)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        circle = !circle; // changing the turn
        // hover state adding
        board.classList.remove('x');
        board.classList.remove('circle');
        if(circle){
            board.classList.add('circle');
        }else{
            board.classList.add('x');
        }
    }
}
function checkWin(currentMark){
    return winningCombinations.some(combination =>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentMark);
        });
    });
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}
function endGame(draw){
    if(draw)
        messageText.innerText = 'Draw';
    else
        messageText.innerText = `${circle ? 'O' : 'X'} Wins`;
    message.classList.add('show');
}

// actual flow

startGame();