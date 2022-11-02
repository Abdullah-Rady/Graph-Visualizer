let visiteddfs;
let layersDFS;


function inistalizationDFS(){
    visiteddfs = []
    layersDFS = []

    for (let i = 0; i < nrows; i++) {
        visiteddfs.push(Array(ncols).fill(false))
        layersDFS.push(Array(ncols).fill(0))
    }
}


function dfs(startx, starty) {

    highestTimeoutId = -1;
    inistalizationDFS()
    
    visiteddfs[starty][startx] = true
    
    const stack  = []

    stack.push([startx, starty])

    let step = 1
    let maxTime = -1

    while (stack.length > 0) {

        const s = stack.pop()
        
        let nx = s[0]
        let ny = s[1]

        visiteddfs[ny][nx] = true

        if (graphRefrence[ny].children[nx].classList.contains('endDiv')){
            tracePathDFS(maxTime)
            return
        }


        highestTimeoutId = setTimeout(() => {
            graphRefrence[ny].children[nx].classList.add('node-search')
            step++

        }, 10 * step);

        maxTime = Math.max(maxTime, 10 * step)

        for (let i = 0; i < 4; i++) {
            
            if (inBounds(nx + dx[directions[i]], ny + dy[directions[i]]) && !visiteddfs[ny + dy[directions[i]]][nx + dx[directions[i]]] && !graphRefrence[ny + dy[directions[i]]].children[nx + dx[directions[i]]].classList.contains('node-wall')){

                stack.push([nx + dx[directions[i]], ny + dy[directions[i]]])

            }
            
        }
        step++

    }
        

}


function tracePathDFS(maxTime){

    inistalizationDFS()


    visiteddfs[starty][startx] = true
    
    const stack  = []

    stack.push([startx, starty])

    let step = 1

    while (stack.length > 0) {

        const s = stack.pop()
        
        let nx = s[0]
        let ny = s[1]

        visiteddfs[ny][nx] = true

        if (graphRefrence[ny].children[nx].classList.contains('endDiv')){
            return
        }


        setTimeout(() => {
            graphRefrence[ny].children[nx].classList.add('node-path')
        }, 10 * step + maxTime);


        for (let i = 0; i < 4; i++) {
            
            if (inBounds(nx + dx[directions[i]], ny + dy[directions[i]]) && !visiteddfs[ny + dy[directions[i]]][nx + dx[directions[i]]] && !graphRefrence[ny + dy[directions[i]]].children[nx + dx[directions[i]]].classList.contains('node-wall')){

                stack.push([nx + dx[directions[i]], ny + dy[directions[i]]])

            }
            
        }
        step++

    }

}