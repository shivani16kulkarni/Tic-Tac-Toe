function createPlayer(name, choice) {
    let playerName = name;
    let playerChoice = choice;
    function getPlayerChoice() {
        return playerChoice;
    }
    function getPlayerName() {
        return playerName;
    }
    function setPlayerName(newName) {
        playerName = newName;
    }
    return ({ getPlayerChoice, getPlayerName, setPlayerName });
}

let gameBoard = (function GameBoard() {
    let gameBoardInstance;
    let choice = 'X';
    let winnerChoice;

    function getIndex(position) {
        return ([Math.floor(position / 3), position % 3]);
    }

    function changeChoice() {
        if (choice === 'X')
            choice = 'O';
        else
            choice = 'X';
    }

    function markChoice(node) {
        const p = document.createElement('p');
        p.innerText = choice;
        p.classList.add('marked');
        node.appendChild(p);
    }

    function updateDatabase(node) {
        const position = [...node.parentNode.children].indexOf(node);
        let [x, y] = getIndex(position);
        gameBoardInstance[x][y] = choice;
        console.log(gameBoardInstance);
    }

    function updateGameBoard(node) {
        markChoice(node);
        updateDatabase(node);
        changeChoice();
    }

    function resetDataBase() {
        gameBoardInstance = Array.from({ length: 3 }, () => new Array(3).fill(''));
    }

    function resetGameBoard() {
        const gameBoardContainer = document.querySelector('.gameBoard');
        gameBoardContainer.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            console.log('count')
            gameBoardContainer.appendChild(box);
        }
    }

    function createGameBoard() {
        resetDataBase();
        resetGameBoard();
    }

    function checkHorizontalInstance() {
        for (let x = 0; x < 3; x++) {
            if (gameBoardInstance[x][0] === gameBoardInstance[x][1] && gameBoardInstance[x][1] === gameBoardInstance[x][2] && gameBoardInstance[x][1] != '') {
                winnerChoice = gameBoardInstance[x][0];
                return true;
            }
        }
        return false;

    }
    function checkVerticalInstance() {
        for (let y = 0; y < 3; y++) {
            if (gameBoardInstance[0][y] === gameBoardInstance[1][y] && gameBoardInstance[1][y] === gameBoardInstance[2][y] && gameBoardInstance[1][y] != '') {
                winnerChoice = gameBoardInstance[0][y];
                return true;
            }
        }
        return false;

    }
    function checkDiagonalInstance() {
        if (((gameBoardInstance[0][0] === gameBoardInstance[1][1] && gameBoardInstance[1][1] === gameBoardInstance[2][2]) || gameBoardInstance[0][2] === gameBoardInstance[1][1] && gameBoardInstance[1][1] === gameBoardInstance[2][0]) && gameBoardInstance[1][1] != '') {
            winnerChoice = gameBoardInstance[1][1];
            return true;
        }
        return false;
    }

    function checkInstance() {
        return (checkHorizontalInstance() || checkVerticalInstance() || checkDiagonalInstance()) ? winnerChoice : '';
    }

    return ({ updateGameBoard, checkInstance, createGameBoard });
})();

(function playGame() {
    function disableNameFields(){
        const inputs = document.querySelectorAll('input');
        for (let input of inputs) {
            input.disabled = true;
        }
    }
    function enableNameFields(){
        const inputs = document.querySelectorAll('input');
        for (let input of inputs) {
            input.disabled = false;
        }
    }
    function clearNameFields(){
        const inputs = document.querySelectorAll('input');
        for(let input of inputs)
            input.value = '';
    }
    // 
    function announceWinner(winner) {
        const dialog = document.querySelector('dialog');
        const dialogMessage = document.querySelector('.dialogMessage');
        dialog.showModal();
        winner = (winner === 'X') ? Player1.getPlayerName() : Player2.getPlayerName();
        dialogMessage.innerText = `${winner} Wins`;
    }
    // 
    let Player1 = createPlayer('Player1', 'X');
    let Player2 = createPlayer('Player2', 'O');
    // 
    gameBoard.createGameBoard();
    // 
    document.querySelector('.choice').addEventListener('input', (event) => {
       event.target.name === 'player1' ? Player1.setPlayerName(event.target.value) : Player2.setPlayerName(event.target.value);
    });
    // 
    document.querySelector('.gameBoard').addEventListener('click', (event) => {
        disableNameFields();
        if (event.target.className === 'box' && event.target.childElementCount === 0) {
            gameBoard.updateGameBoard(event.target);
            let winner = gameBoard.checkInstance();
            if (winner != '')
                announceWinner(winner);
        }
    })
    // 
    document.querySelector('.restartButton').addEventListener('click', () => {
        gameBoard.createGameBoard();
        enableNameFields();
        clearNameFields();
    });
    // 
    document.querySelector('.dialogButton').addEventListener('click', () => {
        gameBoard.createGameBoard();
        enableNameFields();
        clearNameFields();
        const dialog = document.querySelector('dialog');
        dialog.close();
    });
}
)();

// Priority:
// Bugs:
// Reset choice
// Tie case
// Non Priority:
// Option: Play against machine
// Better Logic to checkInstance()



