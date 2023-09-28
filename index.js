document.addEventListener("DOMContentLoaded", ()=>{
    //variables
    let username = document.querySelector("#username")
    let team = document.querySelector("#team-names")
    const clicker = document.querySelector("#red-clicker")
    const points = document.querySelector("#points")
    let clicks = 0
    let timer = document.querySelector("#timer")
    const finalMsg = document.querySelector("#score-msg")
    const retryBtn = document.querySelector("#retry")
    const scoreboard = document.querySelector("#scoreboard")


    //makes username and team select store values
    document.querySelector("#start-btn").addEventListener("click", ()=>{
        username.textContent = username.value
        console.log(team.value)
        
        //makes timer start
        const gameTimer = setInterval(countdown, 1000)
        gameTimer

        //makes button work and stores points
    clicker.addEventListener("click", ()=>{
        if(timer.textContent > 0){
            clicks++
            points.innerHTML= `points: ${clicks}`
        }
    })
    })


    //makes retry button work
    retryBtn.addEventListener("submit", ()=> {
        event.preventDefault()
        console.log(team.value)
        let teamVal = team.value
        updateScore(teamVal)
    })
    

    //recognizes timer is at 0 and triggers events
    setInterval(function checkTimer() {
        if(timer.textContent == 0){
            clearTimeout()
            finalMsg.textContent = `Congrats ${username.textContent} on scoring ${clicks} points!`
            retryBtn.classList.remove("hidden")
            document.querySelector("#score-hold").classList.remove("hidden")
        }
    }, 100)

    //scoreboard functionality
    fetch(`http://localhost:3000/teams`)
        .then(res => res.json())
        .then(data => data.forEach(e => makeScoreCard(e)))

        //scoreboard update from points scored
       function updateScore(e) {
            fetch(`http://localhost:3000/teams/${e.value}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        }

    //functions
        
        //timer
        function countdown(){
            if(timer.textContent == 0) {
                clearInterval(gameTimer)
            }else {
                timer.textContent--
            }
        }

        //creates one team scorecard
        function makeScoreCard(e){
            let teamPoints = e.score
                teamPoints.id = 'current-points'
            let teamScore = document.createElement('li')
                    teamScore.textContent = `${e.teamName}: ${e.score}`
                scoreboard.appendChild(teamScore)
        }

        
   
})