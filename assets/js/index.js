import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
document.addEventListener('DOMContentLoaded', () => {
    // set up win message
    const message = document.createElement('div');
    message.setAttribute('class', 'hide');
    message.setAttribute('id', 'message');
    message.innerText = 'You Win!';
    document.body.appendChild(message);

    // set up container for the table
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    document.body.appendChild(container);

    // set up the table with rows and cols depending on
    // the board data
    const table = document.createElement('table');

    board.grid.forEach((row, rowIndex) => {
        let tr = document.createElement('tr');

        row.forEach((col, colIndex) => {
            let td = document.createElement('td');
            td.setAttribute('class', 'cell empty');

            // add datasets to row, col
            td.setAttribute('data-row', rowIndex);
            td.setAttribute('data-col', colIndex);

            // helper function for handling click
            const handleCellClick = () => {

                let strike = board.makeHit(rowIndex, colIndex);
                td.setAttribute('data-ships', strike);

                if(td.dataset.ships === 'null') {
                    td.className = 'cell miss';
                } else {
                    td.className = 'cell hit';
                    td.innerText = strike;
                }

                td.removeEventListener('click', handleCellClick);
                checkGameOver(board);

            }

            td.addEventListener('click', handleCellClick);

            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    container.appendChild(table);
});

const checkGameOver = board => {
    if(board.isGameOver()) {
        let empty = document.getElementsByClassName('cell empty');

        for(let el of empty) {
            el.replaceWith(el.cloneNode(true));
        }

        let message = document.getElementById('message');
        message.setAttribute('class', 'show');
    }
}
