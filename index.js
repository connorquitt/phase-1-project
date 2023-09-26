document.addEventListener("DOMContentLoaded", ()=>{
    //global variables
    const clicker = document.querySelector("#red-clicker")
    const points = document.querySelector("#points")
    let clicks = 0
    let timer = document.querySelector("#timer")

    //makes username and team select store values
    document.querySelector("#start-btn").addEventListener("click", ()=>{
        let username = document.querySelector("#username").value
        let team = document.querySelector("#click-drop").value
        document.querySelector("#username").value = ''
        document.querySelector("#click-drop").value = ''
        //makes timer start
        const gameTimer = setInterval(countdown, 1000)
        gameTimer
        
        
    })

    //makes button work and stores points
    clicker.addEventListener("click", ()=>{
        if(timer.textContent > 0){
            clicks++
            points.innerHTML= `points: ${clicks}`
        }else{
            let finalScore = clicks
        }
    })
   
})

    //functions
        
        //timer
    function countdown(){
        if(timer.textContent == 0) {
            clearTimeout(gameTimer)
        }else {
            timer.textContent--
        }
    }
