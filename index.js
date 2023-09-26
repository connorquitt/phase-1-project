document.addEventListener("DOMContentLoaded", ()=>{
    //variables
    let username = document.querySelector("#username")
    let team = document.querySelector("#click-drop")
    const clicker = document.querySelector("#red-clicker")
    const points = document.querySelector("#points")
    let clicks = 0
    let timer = document.querySelector("#timer")
    const finalMsg = document.querySelector("#score-msg")
    const retryBtn = document.querySelector("#retry")
    const scoreboard = document.querySelector("#scoreboard")
    const purpleScore = document.querySelector("#purple-total")
    const blueScore = document.querySelector("#blue-total")
    const yellowScore = document.querySelector("#yellow-total")
    const greenScore = document.querySelector("#green-total")
    let localScore = []
    

    //makes username and team select store values
    document.querySelector("#start-btn").addEventListener("click", ()=>{
        username.textContent = username.value 
        team.textContent = team.value
        
        //makes timer start
        const gameTimer = setInterval(countdown, 1000)
        gameTimer
    })

    //makes button work and stores points
    clicker.addEventListener("click", ()=>{
        if(timer.textContent > 0){
            clicks++
            points.innerHTML= `points: ${clicks}`
        }
    })

    //makes retry button work
    retryBtn.addEventListener("click", ()=> document.location.reload(true))

    //recognizes timer is at 0 and triggers events
    setInterval(function checkTimer() {
        if(timer.textContent == 0){
            clearTimeout()
            let finalScore = clicks
            finalMsg.textContent = `Congrats ${username.textContent} on scoring ${finalScore} for team ${team.textContent}!`
            retryBtn.classList.remove("hidden")
            scoreboard.classList.remove("hidden")
        }
    }, 100)

    //functions
        
        //timer
        function countdown(){
            if(timer.textContent == 0) {
                clearInterval(gameTimer)
            }else {
                timer.textContent--
            }
        }

        
      //submit button/updating scoring in json file
        function updateScore(teamObj) {
            fetch(`http://localhost:3000/teams${teamObj.id}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(score)
            })
        }
        
   
})

//want to use foreach instead to turn them into a type of card to show as a leaderboard and then i can still send a patch request to update the score on the cards
//like i've already done :)