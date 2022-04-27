



const game = (function () {

})();



const htmlInterface = (function () {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');

    let clickEventHandler = null;

    let name = 'test';

    cells.forEach( setText );

    function setText(cell) {
        cell.addEventListener('click',handleClick);
    }

    function handleClick(e) {
        if (clickEventHandler ) {
            clickEventHandler(e.target);
        }
    }

    function setEventHandler(eventHandlerFunction) {
        clickEventHandler = eventHandlerFunction;
    }



    function getCellByCoordinates(x,y) {
        const index = x + y*3;

        return cells[index];
    }

    function setCellState(x,y,state) {
        let cell = getCellByCoordinates(x,y);

        switch (state) {
            case 'X':
                cell.style.backgroundImage = 'url("assets/X.svg")';
                break;
            case 'O':
                cell.style.backgroundImage = 'url("assets/O.svg")';
                break;
            default: 
                cell.style.backgroundImage = 'none';
                break;
        }
    }

    return { setCellState , setEventHandler };
})();






let clicked = function (target) {
    console.log(target);
}

htmlInterface.setEventHandler(clicked);