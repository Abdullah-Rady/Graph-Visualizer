let visitedbfs;
let layersBFS;
let prevBFS;

function intializebfs(){
    visitedbfs = []
    layersBFS = []
    prevBFS = []
    for (let i = 0; i < nrows; i++) {
        visitedbfs.push(Array(ncols).fill(false))
        layersBFS.push(Array(ncols).fill(-1))
        prevBFS.push(Array(ncols).fill('A'))
    }

}

const deque = (arr) => {
    let a  = arr[0]
    arr.shift()
    return a
};

function bfs(startx, starty) {

    highestTimeoutId = -1;
    intializebfs()
    
    visitedbfs[starty][startx] = true
    layersBFS[starty][startx] = 0
    prevBFS[starty][startx] = 'F'
    
    const queue  = []

    queue.push([startx, starty])
    let maxTime = 0

    while (queue.length > 0) {

        const s = deque(queue)
        
        let nx = s[0]
        let ny = s[1]

        for (let i = 0; i < 4; i++) {
            
            if (inBounds(nx + dx[directions[i]], ny + dy[directions[i]]) && !visitedbfs[ny + dy[directions[i]]][nx + dx[directions[i]]] && !graphRefrence[ny + dy[directions[i]]].children[nx + dx[directions[i]]].classList.contains('node-wall')) {

                layersBFS[ny + dy[directions[i]]][nx + dx[directions[i]]] = 1 + layersBFS[ny][nx]

                prevBFS[ny + dy[directions[i]]][nx + dx[directions[i]]] = OPPOSITE[directions[i]]

                if (graphRefrence[ny + dy[directions[i]]].children[nx + dx[directions[i]]].classList.contains('endDiv')){
                    
                    let s = ''
                    for (let i = 0; i < prevBFS.length; i++) {
                        for (let j = 0; j < prevBFS[0].length; j++) {
                            s += prevBFS[i][j] + " ";
                        }
                        s+= '\n'
                    }
                    console.log(s);

                    tracePathBFS(nx + dx[directions[i]], ny + dy[directions[i]], maxTime)

                    return
                }

                highestTimeoutId = setTimeout(() => {
                    graphRefrence[ny + dy[directions[i]]].children[nx + dx[directions[i]]].classList.add('node-search')

                }, 100 * layersBFS[ny + dy[directions[i]]][nx + dx[directions[i]]]);

                maxTime = Math.max(maxTime, 100 * layersBFS[ny + dy[directions[i]]][nx + dx[directions[i]]])

                visitedbfs[ny + dy[directions[i]]][nx + dx[directions[i]]] = true

                queue.push([nx + dx[directions[i]], ny + dy[directions[i]]])
            }
            
        }
    }   

}



function tracePathBFS(x, y, maxTime){

    let xx = x
    let yy = y
    let path = []
    

    while(true){

        path.push(graphRefrence[yy].children[xx])
        let yynew = yy
        yy = yy + dy[prevBFS[yy][xx]]
        xx = xx + dx[prevBFS[yynew][xx]]   
        // console.log(yy, xx, prevBFS[yy][xx]);

        if(prevBFS[yy][xx] == 'F')
            break

    }

    // while(layersBFS[yy][xx] != 0){

    //     let min = 1000000
    //     for (let i = 0; i < 4; i++) {
            
    //         if (inBounds(yy + dy[directions[i]], xx + dx[directions[i]]) && layersBFS[yy + dy[directions[i]]][xx + dx[directions[i]]] < min && layersBFS[yy + dy[directions[i]]][xx + dx[directions[i]]] >= 0){
    //             min = layersBFS[yy + dy[directions[i]]][xx + dx[directions[i]]]
    //             xx = xx + dx[directions[i]]
    //             yy = yy + dy[directions[i]]
    //         }
        
    //     }

    //     path.push(graphRefrence[yy].children[xx])
    // }

    let j = 1
    while(path.length > 0){
        
        let div = path.pop()
        
        setTimeout(() => {
            div.classList.remove('node-search')
            div.classList.add('node-path')
        }, maxTime + 100 * j);

        j++;
    }
}