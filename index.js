
//All Global Variables
let username = document.querySelector("#username")
const clicker = document.querySelector("#red-clicker")
const points = document.querySelector("#points")
let clicks = 0
let timer = document.querySelector("#timer")
const finalMsg = document.querySelector("#score-msg")
const retryBtn = document.getElementById("retry")
const scoreboard = document.querySelector("#scoreboard")
const startBtn = document.querySelector("#start-btn")
const btnDiv = document.getElementById('clickers')

//Timer, Username entry, Button, and updates points value
//Click is unique event listener #1
startBtn.addEventListener("click", ()=>{

    btnDiv.classList.add('started')
    //Stores username entry
    username.textContent = username.value 
    //Timer functionality
    function countdown(){
        if(timer.textContent == 0) {
            clearInterval(gameTimer)
            btnDiv.classList.remove("started")
        }else {
            timer.textContent--
        }
    }
    const gameTimer = setInterval(countdown, 1000)
    gameTimer

    //makes button work and stores points
    
})

clicker.addEventListener("click", ()=>{
    if(timer.textContent > 0 && btnDiv.className === "started"){
        clicks = clicks + 1
        points.textContent= `points: ${clicks}`
    }else if(timer.textContent === 0) {
        return null
    }
})


//Triggers final message and unhides scoreboard/retry btn when timer is at 0
setInterval(function checkTimer() {
    if(timer.textContent == 0){
        clearTimeout()
        finalMsg.textContent = `Congrats ${username.textContent} you have ${clicks} points! Please select which team to donate them to`
        retryBtn.classList.remove("hidden")
        document.querySelector("#score-hold").classList.remove("hidden")
    }
}, 100)


//Reveal scoreboard with tab
//Unique event listener #2 (keydown)
document.addEventListener("keydown", () => {
    if(event.key === "Tab") {
        document.querySelector("#score-hold").classList.remove("hidden")
        document.querySelector("#score-reveal").classList.add("hidden")
        retryBtn.classList.remove("hidden")
    }
})
        //wantt to update to be able to rehide with tab again

//Retry button
//Unique event listener #3 (submit)
retryBtn.addEventListener("submit", ()=> resetPage())
        //update to not reload page but to instead just update DOM to a fresh start


//Fetch request to create scoreboard and start with the correct points
fetch(`http://localhost:3000/teams`)
        .then(res => res.json())
        .then(data => data.forEach(e => makeScoreCard(e)))
            //after updating how to select team will need to change to use filter
                //will store the selected team in a global variable and then use filter to get the correct team and update that teams point total with patch
         
//function to update the score (PATCH) after game ends
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


//function used to create each scorecard
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

//function to reset all DOM elements of the page for the try again button instead of refreshing the page
function resetPage(){
    event.preventDefault()
    timer.textContent = 5
    scoreboard.classList.add("hidden")
    retryBtn.classList.add("hidden")
    finalMsg.classList.add("hidden")

}


 
/*
    organize code better (DONE)
        - double check indentation on functions/variables to make sure its obvious they aren't inside of other things
        -organize its order better so you can find things better without looking dumb
    Update event listeners to make the score update a submit and not a click to fufill 3 unique event listers (DONE)
    get rid of foreach and refactor the teams so that there is a select bar at the top to choose your team (NOT DONE)
        -save the team selected in a glabal variable, then run .filter on the array of teams returned from a fetch to get the correct team and update score
    
*/



