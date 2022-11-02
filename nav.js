let algorithm = ""

const optionButtons = document.querySelectorAll('.nav-btn');
const dropdwonItems = document.querySelectorAll('.dropdown-item');
const pathList = document.querySelector('.path-list')
const reset = document.querySelector('.reset')
const mazeList = document.querySelector('.maze-list')
const visualize = document.querySelector('.visualize');

const startBFS = () => {
    bfs(startx, starty)
}

const startDFS = () => {
    dfs(startx, starty)
}

optionButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (button.id == "path-grp-btn") {

            if (pathList.classList.contains("hide")) {
                mazeList.classList.add("hide")
                pathList.classList.remove("hide")
                return
            }

            pathList.classList.add("hide")
            return
        }
        
        if (mazeList.classList.contains("hide")) {
            pathList.classList.add("hide")
            mazeList.classList.remove("hide")
            return
        }
        mazeList.classList.add("hide")
    });
})


dropdwonItems.forEach((item) => {

    item.addEventListener("mouseover", () => {
        item.style.backgroundColor = "rgba(220, 220, 220, 1)";
    })

    item.addEventListener("mouseout", () => {
        item.style.backgroundColor = "#fff";
    })

    if(item.classList.contains("path-item")) {


        item.addEventListener("click", () => {
            algorithm = item.innerHTML.toLocaleLowerCase();
            document.querySelector('.visualize').innerHTML = "visualize " + algorithm.toUpperCase()
            pathList.classList.add("hide")

            if(item.classList.contains("bfs")) {
                visualize.removeEventListener("click", startDFS);
                visualize.addEventListener("click", startBFS)
            }else{
                visualize.removeEventListener("click", startBFS)
                visualize.addEventListener("click", startDFS)
            }

        });

    } else{

        item.addEventListener("click", () => {
            primsAlgorithm()
            mazeList.classList.add("hide")

        });
    }
})

reset.addEventListener('click', ()=>{

    generateGrid()

    if(highestTimeoutId != -1){
        for(let i = highestTimeoutId; i>0;i--)
            clearTimeout(i)
    }

})
