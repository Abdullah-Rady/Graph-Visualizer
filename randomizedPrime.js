
let dx2 = { "E": 2, "W": -2, "N": 0, "S": 0 }
let dy2 = { "E": 0, "W": 0, "N": -2, "S": 2 }

function primsAlgorithm(){
    generateGrid()
    removeStartEnd()

    for(let i = 0; i < graphRefrence.length; i++) {
        for (let j = 0; j < graphRefrence[0].children.length; j++) {
            graphRefrence[i].children[j].classList.add('node-wall')
        }
    }

    wallList = []

    //graphRefrence[2].children[2].classList.remove('node-wall')

    for (let i = 0; i < directions.length; i++) {
        if (inBounds(1 + 2*dx[directions[i]], 1 + 2*dy[directions[i]]))
            wallList.push([2*dy[directions[i]], 2*dx[directions[i]], 1 + 2*dy[directions[i]], 1 + 2*dx[directions[i]]])
    }

    while(wallList.length > 0){

        const randomPos = Math.floor(Math.random() * wallList.length)
        const random = wallList[randomPos]
        wallList = arrayRemove(wallList, randomPos)
        
        let x = random[3]
        let y = random[2]

        if(graphRefrence[y].children[x].classList.contains('node-wall')){

            graphRefrence[y].children[x].classList.remove('node-wall')
            graphRefrence[y - random[0]/2].children[x - random[1]/2].classList.remove('node-wall')

            for (let i = 0; i < directions.length; i++) {

                if(inBounds(random[3] + dx2[directions[i]], random[2] + dy2[directions[i]]))
                    wallList.push([dy2[directions[i]], dx2[directions[i]], random[2] + dy2[directions[i]], random[3] + dx2[directions[i]]])
            }

        }

    }

    placeStartEnd()

}