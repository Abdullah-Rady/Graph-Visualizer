let highestTimeoutId = -1;


//refrence to graoh to be able to do algorithms on


//remove elemrnt from an array
function arrayRemove(arr, value) { 

    let ne = []

    for (let i = 0; i < arr.length; i++) {
        
        if (i != value){
            ne.push(arr[i])
        }
        
    }
    return ne
}

//check if the move we will do is inside the bounds
function inBounds(x, y){
    if(x < 0 || x >= ncols){
        return false
    }

    if(y < 0 || y >= nrows){
        return false
    }

    return true
}

// returns a random permutation of the array
function randomArrayShuffle(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

// directions and the move in the grid for each direction
let directions = ["N", "S", "E", "W"]
let dx = { "E": 1, "W": -1, "N": 0, "S": 0 }
let dy = { "E": 0, "W": 0, "N": -1, "S": 1 }
let OPPOSITE = { "N": "S", "S": "N", "E": "W", "W": "E"}