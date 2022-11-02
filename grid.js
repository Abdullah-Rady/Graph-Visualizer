const height = window.innerHeight
const width = window.innerWidth
const sizeInput = document.querySelector('.size-input')
let size = sizeInput.value
let nrows = Math.round((height - 30) / size) 
let ncols =   Math.round((width - 30) / size) 
let startx;
let starty;
let endx;
let endy;

// An array to store the last move to be able to undo
let lastMove = []

var graph = document.querySelector(".graph")

sizeInput.addEventListener('change', () => {
    size = sizeInput.value
    nrows = Math.round((height - 30) / size) 
    ncols =  Math.round((width - 30) / size)
    generateGrid()
})

//we can make a wall by changing the background color or adding a new class to it
const makeWall = (e) => {
    e.preventDefault()

    if(e.target.classList.contains("wall")) {
        return
    }

    lastMove.push([e.target, mouseDownCount])
    e.target.classList.add('node-wall')
}

//mouse down flag
let mouseDown = false
let mouseDownCount = 0
//add an event to know when the mouse is clicked so we can draw walls
window.onmousedown = (e) => {  

    mouseDownCount++
    //check if it clicked on a grid cell since this event is on the window
    if (e.target.classList.contains('cells') && e.buttons == 1) {
        mouseDown = true
    }
    lastMove.push([e.target, mouseDownCount])
}  


window.onmouseup = () => {  
   mouseDown = false
}  

// adding a keylistner that can undo the last move 
window.addEventListener('keydown', (e) => {
    e.preventDefault()

    //if the pressed key is u then remove whatever we have in the stack and reset the background 
    if(e.key === 'u'){

        let move = lastMove[lastMove.length - 1][1]
        while(lastMove.length > 0){

            if(move != lastMove[lastMove.length - 1][1]){
                return
            }

            lastMove.pop()[0].classList.remove('node-wall')
        }
    }
})

function generateGrid(){

    //if we regenereated the grid we need to reset the inner html
    graph.innerHTML = ''


    for (let i = 0; i < nrows; i++) {
        
        let row = document.createElement("div")
        row.classList.add("rows")


        for (let j = 0; j < ncols; j++) {

            let col = document.createElement("div")

            col.style.width = size + "px"
            col.style.height = size + "px"

            col.addEventListener('click',
                    makeWall)

            // when the mouse enters it will call this function with a paremeter of the event that has the target and position and other details
            col.addEventListener('mouseover', (e) => { 
                if (mouseDown) {  
                    makeWall(e); 
                }
            })

            col.addEventListener('mousedown', (e) => {
                makeWall(e);
            })

            col.classList.add("cells")
            

            row.appendChild(col)
        }

        graph.appendChild(row)
        
    }
    placeStartEnd()
    makegraphRefrence()
}

function placeStartEnd(){


    startx = Math.floor(Math.random() * ncols / 4)
    starty = Math.floor(Math.random() * nrows / 4)

    endx = Math.floor(Math.random() * ncols * 3 / 4)
    endy = Math.floor(Math.random() * nrows* 3 / 4)


    while(graph.children[starty].children[startx].classList.contains("node-wall")){
        startx = Math.floor(Math.random() * ncols / 4)
        starty = Math.floor(Math.random() * nrows / 4)
    }

    graph.children[starty].children[startx].innerHTML = '<i class="fa-solid fa-play play"></i>'
    graph.children[starty].children[startx].classList.add('startDiv')

    while(graph.children[endy].children[endx].classList.contains("node-wall") || (endx == startx && endy == starty)){
        endx = Math.floor(Math.random() * ncols / 4)
        endy = Math.floor(Math.random() * nrows / 4)
    }



    graph.children[endy].children[endx].innerHTML = '<i class="fa-solid fa-forward-step end"></i>'
    graph.children[endy].children[endx].classList.add('endDiv')
}

function removeStartEnd(){

    graph.children[starty].children[startx].innerHTML = ''
    graph.children[starty].children[startx].classList.remove('startDiv')
    graph.children[endy].children[endx].innerHTML = ''
    graph.children[endy].children[endx].classList.remove('endDiv')


}

let graphRefrence = []

function makegraphRefrence(){
    graphRefrence = []
    for (let i = 0; i < graph.children.length; i++) {
        graphRefrence.push(graph.children[i])
    }
}

generateGrid();
