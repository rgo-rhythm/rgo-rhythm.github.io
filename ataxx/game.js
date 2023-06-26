var ATAXX = {};

ATAXX.board = [];

function initBoard() {
    let row = parseInt(document.querySelector("input[name=row]").value);
    let col = parseInt(document.querySelector("input[name=col]").value);
    
    document.querySelector(".set_game").style.display = "none";
    document.querySelector(".game_board").style.display = "block";

    let board = document.querySelector("#board");
    
    let boardText = "";
    for (let r = 0; r < row; r++) {
        let rowVector = [];
        boardText += "<tr>";
        for (let c = 0; c < col; c++) {
            boardText += "<td class='cell'>";
            boardText += "</td>";
            rowVector.push(0);
        }
        boardText += "</tr>";
        ATAXX.board.push(rowVector);
    }
    
    board.innerHTML = boardText;
    
    let p1init = [[1, 1], [row, col]]
    let p2init = [[row, 1], [1, col]];
    
    for (let i = 0; i < 2; i++){
        let p1cell = document.querySelector(`#board tr:nth-child(${p1init[i][0]}) > td:nth-child(${p1init[i][1]})`);
        let p2cell = document.querySelector(`#board tr:nth-child(${p2init[i][0]}) > td:nth-child(${p2init[i][1]})`);
        p1cell.classList.add('p1');
        p2cell.classList.add('p2');
        p1cell.innerText = '●';
        p2cell.innerText = '●';
    }
}



