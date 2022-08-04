function resetGameStatus() {
    gameIsOver = false;
    activePlayer = 0;
    currentRounds = 1;
    gameOverElement.firstElementChild.innerHTML = 'You Won, <span id="winner-name">PLAYER NAME</span>!'
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please Enter a custom name for both players');
        return;
    }

    resetGameStatus();

    activePlayerName.textContent = players[activePlayer].name
    gameArea.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }
    else {
        activePlayer = 0;
    }

    activePlayerName.textContent = players[activePlayer].name
}

function selectGameField(event) {
    if (event.target.tagName !== 'LI' || gameIsOver ) {
        return;
    }

    const selectFeild = event.target;
    const selectColumn = selectFeild.dataset.col - 1;
    const selectRow = selectFeild.dataset.row - 1;

    if (gameData[selectRow][selectColumn] > 0) {
        alert('Please select an empty Element')
        return;
    }

    selectFeild.textContent = players[activePlayer].symbol;
    selectFeild.classList.add('disabled');

    gameData[selectRow][selectColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();

    currentRounds++;
    switchPlayer();

    if (winnerId !== 0) {
        endGame(winnerId);
    }
}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }

    if (currentRounds === 9) {
        return -1;
    }

    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block'

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    }
    else {
        gameOverElement.firstElementChild.textContent = 'it\'s a draw!'
    }
}