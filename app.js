document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares  = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBin = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;

    //Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [0, width, width+1, width+2]
    ];

    const sTetromino = [
        [1, 2, width, width+1],
        [1, width+1, width+2, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
    ];

    const zTetromino = [
        [1, 2, width+2, width+3],
        [3, width+2, width+3, width*2+2],
        [width+1, width+2, width*2+2, width*2+3],
        [2, width+1, width+2, width*2+1]
        
    ];

    const tTeromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+12, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const oTetromino = [
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2],
        [1, 2, width+1, width+2]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominoes = [lTetromino, sTetromino, zTetromino, tTeromino, oTetromino, iTetromino];

    let currentPosition = 3;
    let currentRotation = 0;

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    //draw the Tretromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    };

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    };

    //make the tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    //assign functions to keyCodes
    function control(event) {
        if (event.keyCode === 37) {
            moveLeft()
        } else if (event.keyCode === 38) {
            rotate()
        } else if (event.keyCode === 39) {
            moveRight()
        } else if (event.keyCode === 40) {
            moveDown()
        }
    };
    
    document.addEventListener('keyup', control);

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    };

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 3
            draw()
            displayShape()
        }
    };

    //move the tetromino left, unless at the edge or there is a block
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    };

    //move the tetronimo right, unless at the edge or there is a block
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }

        draw()
    };

    //rotate the tetromino
    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    };

    //show next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    //the Tetrominoes without rotation
    const upNextTetrominoes = [
        [1, 2, displayWidth+1, displayWidth*2+1], //lTetromino
        [1, 2, displayWidth, displayWidth+1], //sTetromino
        [1, 2, displayWidth+2, displayWidth+3], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTeromino
        [1, 2, displayWidth+1, displayWidth+2], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    //display the shape in the mini-grid display
    function displayShape() {
        //remove any trace of a tetromino from the mini-grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrtominoes[nextRandom].forEach(index => {
            
        })
    }




});