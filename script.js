let x = [];
let o = [];
let xTurn = false;
let winPat = [['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'], ['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'], ['00', '11', '22'], ['02', '11', '20']];

const tableR = document.getElementsByClassName('tableR');
const button = document.getElementById('btn')

for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
        let newElement = document.createElement('td');
        tableR.item(i).appendChild(newElement);
        newElement.addEventListener('click', () => {
            if (elementIsEmpty(newElement)) {
                const img = document.createElement('img');
                if (xTurn) {
                    img.src = 'images/x.svg';
                    x.push(String(i) + String(j))
                }
                else {
                    img.src = 'images/o.png';
                    o.push(String(i) + String(j))
                }
                xTurn = !xTurn
                newElement.append(img)
                img.addEventListener('load', function () { checkWinOrDraw(!xTurn) })


            }

        })

    }

}

const td = document.getElementsByTagName('td')
button.addEventListener('click', () => { reset(); });

function elementIsEmpty(el) {
    return (/^(\s|&nbsp;)*$/.test(el.innerHTML));
}


function checkWinOrDraw(xTurn) {
    for (let i = 0; i < winPat.length; i++) {
        if (xTurn) {

            if (winPat[i].every(element => x.includes(element))) {

                alert('X wins')
                reset()
                return
            }

        }
        else {

            if (winPat[i].every(element => o.includes(element))) {
                alert('O wins')
                reset()
                return
            }

        }
    }


    for (let item of td) {
        if (elementIsEmpty(item))
            return
    }
    alert('Draw')
    reset()
}


function reset() {
    x = [];
    o = [];
    for (let item of td) {
        item.textContent = ''
    }

}


