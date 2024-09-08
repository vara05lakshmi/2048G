var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            updateTile(tile, board[r][c]);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = num > 0 ? num : "";
    tile.className = `tile ${num > 0 ? "x" + num : ""}`;
}

document.addEventListener('keyup', (e) => {
    let moved = false;
    switch (e.code) {
        case "ArrowLeft":
            moved = slideLeft();
            break;
        case "ArrowRight":
            moved = slideRight();
            break;
        case "ArrowUp":
            moved = slideUp();
            break;
        case "ArrowDown":
            moved = slideDown();
            break;
    }
    if (moved) setTwo();
    document.getElementById("score").innerText = `Score: ${score}`;
});

function slide(row) {
    row = row.filter(num => num !== 0);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = row.filter(num => num !== 0);

    while (row.length < columns) row.push(0);
    return row;
}

function slideLeft() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        let newRow = slide(row);
        if (newRow.toString() !== row.toString()) moved = true;
        board[r] = newRow;
        updateRow(r);
    }
    return moved;
}

function slideRight() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice().reverse();
        let newRow = slide(row).reverse();
        if (newRow.toString() !== board[r].toString()) moved = true;
        board[r] = newRow;
        updateRow(r);
    }
    return moved;
}

function slideUp() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newRow = slide(row);
        if (newRow.toString() !== row.toString()) moved = true;
        for (let r = 0; r < rows; r++) {
            board[r][c] = newRow[r];
            updateTile(document.getElementById(`${r}-${c}`), board[r][c]);
        }
    }
    return moved;
}

function slideDown() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
        let newRow = slide(row).reverse();
        if (newRow.toString() !== [board[0][c], board[1][c], board[2][c], board[3][c]].toString()) moved = true;
        for (let r = 0; r < rows; r++) {
            board[r][c] = newRow[r];
            updateTile(document.getElementById(`${r}-${c}`), board[r][c]);
        }
    }
    return moved;
}

function updateRow(r) {
    for (let c = 0; c < columns; c++) {
        updateTile(document.getElementById(`${r}-${c}`), board[r][c]);
    }
}

function setTwo() {
    if (!hasEmptyTile()) return;
    let emptyTiles = []; // Corrected declaration of emptyTiles
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) emptyTiles.push({ r, c });
        }
    }
    let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[r][c] = 2;
    updateTile(document.getElementById(`${r}-${c}`), 2);
}

function hasEmptyTile() {
    return board.flat().includes(0);
}
