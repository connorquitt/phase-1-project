document.addEventListener("DOMContentLoaded", ()=>{
    //variables
    let username = document.querySelector("#username")
    const clicker = document.querySelector("#red-clicker")
    const points = document.querySelector("#points")
    let clicks = 0
    let timer = document.querySelector("#timer")
    const finalMsg = document.querySelector("#score-msg")
    const retryBtn = document.querySelector("#retry")
    const scoreboard = document.querySelector("#scoreboard")
    const form = document.querySelector("#form")
    
    
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
            points.innerHTML= `points: ${clicks}`
        }
    })
    })


    //makes retry button work
    retryBtn.addEventListener("click", ()=> document.location.reload(true))

    //recognizes timer is at 0 and triggers events
    setInterval(function checkTimer() {
        if(timer.textContent == 0){
            clearTimeout()
            let finalScore = clicks
            finalMsg.textContent = `Congrats ${username.textContent} on scoring ${finalScore}! Please select which team to donate them to`
            retryBtn.classList.remove("hidden")
            scoreboard.classList.remove("hidden")
        }
    }, 100)

    //scoreboard functionality
    fetch(`http://localhost:3000/teams`)
        .then(res => res.json())
        .then(data => data.forEach(e => makeScoreCard(e)))

        //scoreboard update from points scored
        function updateScore(team) {
            fetch(`ttp://localhost:3000/teams${team.teamName}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
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
            let teamScore = document.createElement('li')
                    teamScore.innerHTML = `${e.teamName} has: ${e.score} points!`
                let updatePoints = document.createElement('button')
                    updatePoints.className = 'button'
                    updatePoints.id = 'submit-score'
                    updatePoints.textContent = 'Select Team'
                teamScore.appendChild(updatePoints)
                scoreboard.appendChild(teamScore)
                teamScore.querySelector("#submit-score").addEventListener('click', ()=>console.log("click"))
        }

        
   
})

//want to use foreach instead to turn them into a type of card to show as a leaderboard and then i can still send a patch request to update the score on the cards
//like i've already done :)