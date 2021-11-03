let x = []; //maximiser
let o = []; //minimiser
let xTurn = true;
let altTurn = true;
let winPat = [['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'], ['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'], ['00', '11', '22'], ['02', '11', '20']];
const tableR = document.getElementsByClassName('tableR');
const button = document.getElementById('btn')
for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
        let newElement = document.createElement('td');
        newElement.id = String(i) + String(j)
        tableR.item(i).appendChild(newElement);
        newElement.addEventListener('click', () => {
            if (elementIsEmpty(newElement)) {

                //add image for x move
                let img = document.createElement('img');
                img.src = 'images/x.svg';
                x.push(String(i) + String(j))
                newElement.append(img)
                xTurn = false

                //find best move for o and add image
                bestMoveSet = findBestMove()
                const photo = new Image()
                img = document.createElement('img');
                photo.src = 'images/o.png';
                img.src = photo.src
                o.push(bestMoveSet)
                cell = document.getElementById(bestMoveSet)
                try { cell.append(img) }
                catch { }
                xTurn = true
                photo.addEventListener('load', checkState, false)
            }
        })
    }
}


function checkState() {
    //check if o wins
    for (let i = 0; i < winPat.length; i++)
        if (winPat[i].every(element => o.includes(element))) {
            setTimeout(reset, 100)
        }
    //check if draw
    if (x.length + o.length > 8) {
        setTimeout(reset, 100)
    }
}


//if AI aka "o" has got the first move to make
document.addEventListener('onReset', function () {
    if (!altTurn) {
        //make a random move on the board
        let random1 = String(Math.floor(Math.random() * 3))
        let random2 = String(Math.floor(Math.random() * 3))
        let randMoveSet = random1 + random2

        img = document.createElement('img');
        img.src = 'images/o.png';
        o.push(randMoveSet)
        cell = document.getElementById(randMoveSet)
        cell.append(img)
        xTurn = true
    }
})


const td = document.getElementsByTagName('td')
button.addEventListener('click', () => { reset(); });

//check if single cell is empty
function elementIsEmpty(el) {
    return (/^(\s|&nbsp;)*$/.test(el.innerHTML));
}


function minMax(depth) {
    for (let i = 0; i < winPat.length; i++) {

        //check if x wins
        if (winPat[i].every(element => x.includes(element)))
            return 10

        //check if o wins
        if (winPat[i].every(element => o.includes(element)))
            return -10
    }

    // checking if game is draw when all cells are full
    if (x.length + o.length > 8)
        return 0

    //to prevent stack overflow
    if (depth > 7500)
        return 0

    //if maximiser turn
    if (xTurn) {
        let best = -Infinity
        //transverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //check if cell is empty
                if (!x.includes(String(i) + String(j)) && !o.includes(String(i) + String(j))) {
                    //make the move
                    x.push(String(i) + String(j))
                    xTurn = false
                    // Call minimax recursively and choose the maximum value
                    best = Math.max(best, minMax(depth + 1))
                    //undo the move
                    x.pop()
                }
            }
        }
        return best
    }
    //if minimiser turn
    else {
        let best = +Infinity
        //transverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //check if cell is empty
                if (!x.includes(String(i) + String(j)) && !o.includes(String(i) + String(j))) {
                    //make the move
                    o.push(String(i) + String(j))
                    xTurn = true
                    // Call minimax recursively and choose the minimum value
                    best = Math.min(best, minMax(depth + 1))
                    //undo the move
                    o.pop()

                }
            }
        }
        return best
    }


}
function findBestMove() {
    let bestMove = +Infinity
    let bestMoveSet = '99'
    //evaluate minMax for all empty cells and find best cell
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!x.includes(String(i) + String(j)) && !o.includes(String(i) + String(j))) {
                //make the move
                o.push(String(i) + String(j))
                xTurn = true
                //compute function for this value
                let moveVal = minMax(0)
                //undo the move
                o.pop()
                // If the value of the current move is more than the best value, then update best
                if (bestMove > moveVal) {
                    bestMove = moveVal
                    bestMoveSet = String(i) + String(j)
                }
            }
        }
    }
    return bestMoveSet

}
function reset() {
    alert("yeah")
    x = [];
    o = [];
    for (let item of td)
        item.textContent = ''
    altTurn = !altTurn
    //custom event
    const event = new Event('onReset');
    document.dispatchEvent(event)

}

