



const game = (function () {
    let currentPlayer = 0;

    let boardState;
    let gameActive = false;

    let renderFunction = null;
    let displayFunction = null;

    function resetGame() {
        boardState = [
            [0,0,0],
            [0,0,0],
            [0,0,0] 
        ]
    
        gameActive = true;
        display("X's MOVE");
    }

    function playerMove(x,y) {
        if (currentPlayer == 0)
            attemptMove(x,y);
    }


    function attemptMove(x,y) {
        if ( gameActive && boardState[x][y] == 0 ) {

            boardState[x][y] = currentPlayer + 1;
            render(x,y);
            

            switch (checkForEndOfGame()) {
                case 0:

                    currentPlayer = 1 - currentPlayer;
                    if (currentPlayer == 0) {
                        display("X's MOVE");
                    } else {
                        display("O's MOVE");
                        window.setTimeout(aiMove,1000);
                    }
                    break;
                case 1:
                    display('X WINS');
                    gameActive = false;
                    break;
                case 2:
                    display('O WINS');
                    gameActive = false;
                    break;
                case -1:
                    display('STALEMATE');
                    gameActive = false;
                    break;
            }
        }

    }

    function aiMove() {
        let legalMoves = getLegalMoves();

        legalMoves.forEach( (move) =>  {
            move.score = aiScoreMove(move.x,move.y);
        });

        legalMoves.sort( (a,b) =>  {
            return (b.score-a.score);
        })

        console.log(legalMoves);        
        attemptMove(legalMoves[0].x,legalMoves[0].y);

    }

    function getLegalMoves() {
        let legalMoves = [];
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (boardState[i][j] == 0) {
                    legalMoves.push({x:i,y:j,score:-999});
                }
            }
        }
        return legalMoves;
    }

    function aiScoreMove(x,y) {
        boardState[x][y] = 2;
        let score = 0;
        // Score columns
        for (let i = 0; i <= 2; i++) {
            let columnXs = 0;
            let columnOs = 0;
            for (let j = 0; j <= 2; j++) {
                switch (boardState[i][j]) {
                    case 1:
                        columnXs += 1;
                        break;
                    case 2:
                        columnOs += 1;
                        break;
                }
            }
            if (columnOs == 3 && columnXs == 0) {
                score += 100;
            }
            if (columnXs == 3 && columnOs == 0) {
                score -= 100;
            }
            if (columnOs == 2 && columnXs == 0) {
                score += 10;
            }
            if (columnXs == 2 && columnOs == 0) {
                score -= 10;
            }
            if (columnOs == 1 && columnXs == 0) {
                score += 1;
            }
            if (columnXs == 1 && columnOs == 0) {
                score -= 1;
            }
        }
        // Score rows
        for (let i = 0; i <= 2; i++) {
            let columnXs = 0;
            let columnOs = 0;
            for (let j = 0; j <= 2; j++) {
                switch (boardState[j][i]) {
                    case 1:
                        columnXs += 1;
                        break;
                    case 2:
                        columnOs += 1;
                        break;
                }
            }
            if (columnOs == 3 && columnXs == 0) {
                score += 100;
            }
            if (columnXs == 3 && columnOs == 0) {
                score -= 100;
            }
            if (columnOs == 2 && columnXs == 0) {
                score += 10;
            }
            if (columnXs == 2 && columnOs == 0) {
                score -= 10;
            }
            if (columnOs == 1 && columnXs == 0) {
                score += 1;
            }
            if (columnXs == 1 && columnOs == 0) {
                score -= 1;
            }
        }

        {
            let columnXs = 0;
            let columnOs = 0;
            switch (boardState[0][0]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            switch (boardState[1][1]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            switch (boardState[2][2]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            if (columnOs == 3 && columnXs == 0) {
                score += 100;
            }
            if (columnXs == 3 && columnOs == 0) {
                score -= 100;
            }
            if (columnOs == 2 && columnXs == 0) {
                score += 10;
            }
            if (columnXs == 2 && columnOs == 0) {
                score -= 10;
            }
            if (columnOs == 1 && columnXs == 0) {
                score += 1;
            }
            if (columnXs == 1 && columnOs == 0) {
                score -= 1;
            }
        }


        {
            let columnXs = 0;
            let columnOs = 0;
            switch (boardState[0][2]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            switch (boardState[1][1]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            switch (boardState[2][0]) {
                case 1:
                    columnXs += 1;
                    break;
                case 2:
                    columnOs += 1;
                    break;
            }
            if (columnOs == 3 && columnXs == 0) {
                score += 100;
            }
            if (columnXs == 3 && columnOs == 0) {
                score -= 100;
            }
            if (columnOs == 2 && columnXs == 0) {
                score += 10;
            }
            if (columnXs == 2 && columnOs == 0) {
                score -= 10;
            }
            if (columnOs == 1 && columnXs == 0) {
                score += 1;
            }
            if (columnXs == 1 && columnOs == 0) {
                score -= 1;
            }
        }


        boardState[x][y] = 0;

        return score;
    }

    function checkForEndOfGame() {
        // Check for vertical lines
        for (let i = 0; i <= 2; i++) {
            if (boardState[i][0] == boardState[i][1] && boardState[i][0] == boardState[i][2] && boardState[i][0] != 0) {
                return boardState[i][0];
            }    
        }
        // Check for horizontal lines
        for (let i = 0; i <= 2; i++) {
            if (boardState[0][i] == boardState[1][i] && boardState[0][i] == boardState[2][i] && boardState[0][i] != 0) {
                return boardState[0][i];
            }    
        }
        // Check for diagonal lines
        if (boardState[0][0] == boardState[1][1] && boardState[0][0] == boardState[2][2] && boardState[0][0] != 0) {
            return boardState[0][0];
        }
        if (boardState[0][2] == boardState[1][1] && boardState[0][2] == boardState[2][0] && boardState[0][2] != 0) {
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
    function setDisplayFunction(dFunction) {
        displayFunction = dFunction;
    }

    function render(x,y) {
        if (renderFunction) {
            renderFunction(boardState[x][y],x,y);
        }
    }

    function display(text) {
        if (displayFunction) {
            displayFunction(text);            
        }
    }

    return { resetGame, playerMove, setRenderFunction, setDisplayFunction };
})();



const htmlInterface = (function () {
    const boardElement = document.querySelector('.board');
    const cellElements = document.querySelectorAll('.cell');

    const readoutElement = document.querySelector('.gameReadout');

    let clickEventHandler = null;

    cellElements.forEach( addClickListener );

    function addClickListener(cell) {
        cell.addEventListener('click',handleClick);
    }

    function handleClick(e) {
        if (clickEventHandler ) {
            clickEventHandler(e.currentTarget.getAttribute('data-col'),e.currentTarget.getAttribute('data-row'));
        }
    }

    function setEventHandler(eventHandlerFunction) {
        clickEventHandler = eventHandlerFunction;
    }



    function getCellByCoordinates(x,y) {
        const index = x + y*3;

        return cellElements[index];
    }

    function setCellState(state,x,y) {
        x = parseInt(x);
        y = parseInt(y);
        let cell = getCellByCoordinates(x,y).querySelector('path');
        switch (state) {
            case 1:
                cell.setAttribute('d','M 1 1 L 9 9 M 9 1 L 1 9');
                cell.style.strokeWidth = '2px';
                break;
            case 2:
                cell.setAttribute('d','M 1 5 A 1 1 0 0 0 9 5 A 1 1 0 0 0 1 5');
                cell.style.strokeWidth = '2px';
                break;
            default: 
                cell.style.backgroundImage = 'none';
                break;
        }
    }

    function setGameReadoutText(text) {
        readoutElement.textContent = text;
    }

    return { setCellState, setGameReadoutText, setEventHandler };
})();







htmlInterface.setEventHandler(game.playerMove);
game.setRenderFunction(htmlInterface.setCellState);
game.setDisplayFunction(htmlInterface.setGameReadoutText);
game.resetGame();