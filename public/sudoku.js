console.log("Script loaded!");
document.addEventListener("DOMContentLoaded", () => {
    const sudokuContainer = document.getElementById("sudokuContainer");
    let sudokuBoard;
    let timerInterval;
    let startTime;

    startNewGame();
    

    sudokuContainer.addEventListener("click", (e) => {
        const cell = e.target;
        if (cell.classList.contains("cell")) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = prompt("Enter a number (1-9):");
            if (isValidMove(row, col, value)) {
                sudokuBoard[row][col] = parseInt(value);
                renderBoard();
            } else {
                cell.classList.add("incorrect");
                setTimeout(() => {
                    cell.classList.remove("incorrect");
                }, 1000);
            }
        }
    });
    document.getElementById("startButton").addEventListener("click", startNewGame);

    function isValidMove(row, col, value) {
        if (!value || isNaN(value) || value < 1 || value > 9) {
            return false;
        }

        for (let i = 0; i < 9; i++) {
            if (sudokuBoard[row][i] === parseInt(value) || sudokuBoard[i][col] === parseInt(value)) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (sudokuBoard[startRow + i][startCol + j] === parseInt(value)) {
                    return false;
                }
            }
        }

        return true;
    }

    function renderBoard() {
        sudokuContainer.innerHTML = "";
        sudokuBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                if (cell !== ".") {
                    cellElement.textContent = cell;
                }
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                if (isValidMove(rowIndex, colIndex, cell)) {
                    cellElement.classList.add("correct");
                }
                sudokuContainer.appendChild(cellElement);
            });
        });
    }
    
    function startNewGame() {
        console.log("startNewGame called!");
        clearInterval(timerInterval);
        startTime = Date.now();
        sudokuBoard = generateRandomSudoku();
        renderBoard();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function generateRandomSudoku() {
        

        const board = [
            [5, 3, '.', '.', 7, '.', '.', '.', '.'],
            [6, '.', '.', 1, 9, 5, '.', '.', '.'],
            ['.', 9, 8, '.', '.', '.', '.', 6, '.'],
            [8, '.', '.', '.', 6, '.', '.', '.', 3],
            [4, '.', '.', 8, '.', 3, '.', '.', 1],
            [7, '.', '.', '.', 2, '.', '.', '.', 6],
            ['.', 6, '.', '.', '.', '.', 2, 8, '.'],
            ['.', '.', '.', 4, 1, 9, '.', '.', 5],
            ['.', '.', '.', '.', 8, '.', '.', 7, 9]
        ];

        return board;
    }

    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        document.getElementById("timer").textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    
    console.log("Script loaded!");
    function submitGame() {
        console.log("submitGame called!");
        clearInterval(timerInterval);

        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        alert(`Congratulations! You completed the Sudoku puzzle in ${minutes} minutes and ${seconds} seconds.`);
    }
    document.getElementById("submitGame").addEventListener("click", submitGame);
});
