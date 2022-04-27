


const renderer = (function () {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');

    // cells.forEach( function setText(cell) {
    //     cell.textContent = 'test';
    // } );

    function getCellByCoordinates(x,y) {
        const index = x + y*3;

        return cells[index];
    }

    function markCell(x,y,color) {
        let cell = getCellByCoordinates(x,y);

        cell.style.background = color;
    }

    return { markCell };
})();



renderer.markCell(0,1,'red');
renderer.markCell(0,0,'green');
renderer.markCell(2,1,'yellow');
renderer.markCell(2,2,'grey');