
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
let showScore = true

//Timer, Username entry, Button, and updates points value
//Click is unique event listener #1
startBtn.addEventListener("click", ()=>{

    btnDiv.classList.add('started')
    //Stores username entry
    username.textContent = username.value
    username.value = ''
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
function checkTimer() {
    if(timer.textContent == 0){
        clearInterval()
        finalMsg.textContent = `Congrats ${username.textContent} you have ${clicks} points! Please select which team to donate them to`
        retryBtn.classList.remove("hidden")
        document.querySelector("#score-hold").classList.remove("hidden")
    }
}

setInterval(checkTimer, 100)

//Reveal scoreboard with tab
//Unique event listener #2 (keydown)
document.addEventListener("keydown", () => {
    if(event.key === "Tab") {
        showScore = !showScore
        if(showScore === false) {
            document.querySelector("#score-hold").classList.remove("hidden")
            document.querySelector("#score-reveal").textContent = 'Press tab to hide scoreboard'
        } else if (showScore === true) {
            document.querySelector("#score-hold").classList.add("hidden")
            document.querySelector("#score-reveal").textContent = 'Press tab to see scoreboard'
        }
    }
})
        //wantt to update to be able to rehide with tab again

//Retry button
//Unique event listener #3 (submit)
retryBtn.addEventListener("submit", ()=> resetPage())
        //update to not reload page but to instead just update DOM to a fresh start


//Fetch request to create scoreboard and start with the correct points
function scoreGrab() {
    fetch(`http://localhost:3000/teams`)
        .then(res => res.json())
        .then(data => data.map((team) => makeScoreCard(team)))}
            //after updating how to select team will need to change to use filter
                //will store the selected team in a global variable and then use filter to get the correct team and update that teams point total with patch

scoreGrab()

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

function makeScoreCard(e) {
    let teamPoints = e.score
        teamPoints.id = 'current-points'
    let teamScore = document.createElement('ul')
        teamScore.innerHTML = `
            <div>
                <p>
                    ${e.teamName} has: ${e.score} points!
                    <button id='submit-score'>Select Team</button>
                </p>
            </div>
        `
        teamScore.querySelector('#submit-score').addEventListener('click', () => {
            e.score += clicks
            clicks = 0
            points.textContent = `points: ${clicks}`
            teamScore.innerHTML = `
            <div>
            <p>
                ${e.teamName} has: ${e.score} points!
                <button id='submit-score'>Select Team</button>
            </p>
        </div>
            `
            updateScore(e)
        })
        scoreboard.appendChild(teamScore)
    
}

//function to reset all DOM elements of the page for the try again button instead of refreshing the page
function resetPage(){
    event.preventDefault()
    timer.textContent = 5
    document.querySelector("#score-hold").classList.add("hidden")
    retryBtn.classList.add("hidden")
    finalMsg.classList.add("hidden")
    
}


//db.json server sends 5 objects (teams) each with 3 attributes (name, id, and score)
//app runs on one page with no refreshes
//3 unique event listeners (click on line 17, keydown on line 17, and submit on line 79)
//array iterator (map) on line 87



