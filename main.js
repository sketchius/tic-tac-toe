



const game = (function () {
    let currentPlayer = 0;

    let boardState = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    let gameActive = true;

    let renderFunction = null;

    function attemptMove(x,y) {
        if ( gameActive && boardState[x][y] == 0) {
            debugger;
            boardState[x][y] = currentPlayer + 1;
            render(x,y);
            switch (checkForEndOfGame()) {
                case 0:

                case 1:
                    alert('X wins');
                    gameActive = false;
                    break;
                case 2:
                    alert('O wins');
                    gameActive = false;
                    break;
                case -1:
                    alert('Stalemate');
                    gameActive = false;
                    break;
            }
        }
    }

    function checkForEndOfGame() {
        // Check for horizontal lines
        for (let i = 0; i <= 2; i++) {
            if (boardState[i][0] == boardState[i][1] && boardState[i][0] == boardState[i][2]) {
                return boardState[i][0];
            }    
        }
        // Check for vertical lines
        for (let i = 0; i <= 2; i++) {
            if (boardState[0][i] == boardState[1][i] && boardState[0][i] == boardState[2][i]) {
                return boardState[0][i];
            }    
        }
        // Check for diagonal lines
        if (boardState[0][0] == boardState[1][1] && boardState[0][0] == boardState[2][2]) {
            return boardState[0][0];
        }
        if (boardState[0][2] == boardState[1][1] && boardState[0][2] == boardState[2][0]) {
            return boardState[0][2];
        }
        // Check for empty cells
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (boardState[i][j] == 0) {
                    return 0;
                }
            }
        }
        //No empty cells -- stalemate
        return -1;
    }




    function setRenderFunction(rFunction) {
        renderFunction = rFunction;
    }

    function render(x,y) {
        if (renderFunction) {
            renderFunction(boardState[x][y],x,y);
        }
    }

    return { attemptMove, setRenderFunction };
})();



const htmlInterface = (function () {
    const boardElement = document.querySelector('.board');
    const cellElements = document.querySelectorAll('.cell');

    let clickEventHandler = null;

    let name = 'test';

    cellElements.forEach( addClickListener );

    function addClickListener(cell) {
        cell.addEventListener('click',handleClick);
    }

    function handleClick(e) {
        if (clickEventHandler ) {
            clickEventHandler(e.target.getAttribute('data-col'),e.target.getAttribute('data-row'));
        }
    }

    function setEventHandler(eventHandlerFunction) {
        clickEventHandler = eventHandlerFunction;
    }



    function getCellByCoordinates(x,y) {
        debugger;
        const index = x + y*3;

        return cellElements[index];
    }

    function setCellState(state,x,y) {
        x = parseInt(x);
        y = parseInt(y);
        let cell = getCellByCoordinates(x,y);
        switch (state) {
            case 1:
                cell.style.backgroundImage = 'url("assets/X.svg")';
                break;
            case 2:
                cell.style.backgroundImage = 'url("assets/O.svg")';
                break;
            default: 
                cell.style.backgroundImage = 'none';
                break;
        }
    }

    return { setCellState , setEventHandler };
})();







htmlInterface.setEventHandler(game.attemptMove);
game.setRenderFunction(htmlInterface.setCellState);