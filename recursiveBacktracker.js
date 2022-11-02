
// inistalization
const grid = []
const visited = []
for (let i = 0; i < nrows; i++) {
    grid.push(Array(ncols).fill(1))
    visited.push(Array(ncols).fill(false))
}


//choose a random starting position
let startMazeX = Math.round(Math.random() * (ncols))
let startMazeY = Math.round(Math.random() * (nrows)) 

//recursivebacktracker(startMazeX, startMazeY)

// for (let i = 0; i < grid.length; i++) {
//     let s = ""
//     for (let j = 0; j < grid[0].length; j++) {
//         s += grid[i][j] + " "
//     }    
//     console.log(s);
// }

//at every step choose a random neighbor wall and walk throught it repeat this step until you reach a dead end then backtrack until you can continue
//or all of the nodes are visitesd 

function recursiveBacktracker(x, y){

    generateGrid()
    removeStartEnd()

    for(let i = 0; i < graphRefrence.length; i++) {
        for (let j = 0; j < graphRefrence[0].children.length; j++) {
            graphRefrence[i].children[j].classList.add('node-wall')
        }
    }


    const stack = []
    visited[y][x] = true
    graphRefrence[y].children[x].classList.remove('node-wall')
    stack.push([x, y])

    let tt = 0


    while (stack.length > 0) {

        let movements = randomArrayShuffle(directions)
        const s = stack.pop()
        
        let nx = s[0]
        let ny = s[1]


        for (let i = 0; i < 4; i++) {
    
            if (inBounds(nx + 2*dx[movements[i]], ny + 2*dy[movements[i]]) && !visited[ny + 2*dy[movements[i]]][nx + 2*dx[movements[i]]]){
                
                graphRefrence[ny + 2*dy[movements[i]]].children[nx + 2*dx[movements[i]]].classList.remove('node-wall')
                graphRefrence[ny + dy[movements[i]]].children[nx + dx[movements[i]]].classList.remove('node-wall')
                visited[ny + 2*dy[movements[i]]][nx + 2*dx[movements[i]]] = true
                stack.push([nx + 2*dx[movements[i]],  ny + 2*dy[movements[i]]])
            }
            
        }

        
    }

    placeStartEnd()

}
