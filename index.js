document.addEventListener("DOMContentLoaded", ()=>{
    //variables
    let username = document.querySelector("#username")
    const clicker = document.querySelector("#red-clicker")
    const points = document.querySelector("#points")
    let clicks = 0
    let timer = document.querySelector("#timer")
    const finalMsg = document.querySelector("#score-msg")
    const retryBtn = document.querySelector("#retry")
        retryBtn.innerText = 'Start Over'
    const scoreboard = document.querySelector("#scoreboard")
    
    
    
    //makes username and team select store values
    document.querySelector("#start-btn").addEventListener("click", ()=>{
        username.textContent = username.value 
        //makes timer start
        const gameTimer = setInterval(countdown, 1000)
        gameTimer

        //makes button work and stores points
    clicker.addEventListener("click", ()=>{
        if(timer.textContent > 0){
            clicks++
            points.textContent= `points: ${clicks}`
        }
    })
    })


    //makes retry button work
    retryBtn.addEventListener("click", ()=> document.location.reload(true))

    //recognizes timer is at 0 and triggers events
    setInterval(function checkTimer() {
        if(timer.textContent == 0){
            clearTimeout()
            finalMsg.textContent = `Congrats ${username.textContent} you have ${clicks} points! Please select which team to donate them to`
            retryBtn.classList.remove("hidden")
            document.querySelector("#score-hold").classList.remove("hidden")
        }
    }, 100)

    //scoreboard functionality
    fetch(`http://localhost:3000/teams`)
        .then(res => res.json())
        .then(data => data.forEach(e => makeScoreCard(e)))

        //scoreboard update from points scored
        function updateScore(team) {
            fetch(`http://localhost:3000/teams/${team.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        })
        .then(res => res.json(team))
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
                    teamScore.textContent = `${e.teamName} has: ${e.score} points!`
                let updatePoints = document.createElement('button')
                    updatePoints.className = 'update-button'
                    updatePoints.id = 'submit-score'
                    updatePoints.textContent = 'Select Team'
                teamScore.appendChild(updatePoints)
                scoreboard.appendChild(teamScore)
                teamScore.querySelector("#submit-score").addEventListener('click', ()=> {
                    e.score += clicks
                    clicks = 0
                    teamScore.textContent = `${e.teamName} has: ${e.score} points!`
                    points.textContent = `points: ${clicks}`
                    updateScore(e)
                })
        }

        document.addEventListener("keydown", () => {
            if(event.key === "Tab") {
                document.querySelector("#score-hold").classList.remove("hidden")
                document.querySelector("#score-reveal").classList.add("hidden")
                retryBtn.classList.remove("hidden")
            }
        })

        
   
})