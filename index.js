document.addEventListener("DOMContentLoaded", ()=>{
    //makes username and team select store values
    document.querySelector("#submit-btn").addEventListener("click", ()=>{
        let username = document.querySelector("#username").value
        let team = document.querySelector("#click-drop").value
        document.querySelector("#username").value = ''
        document.querySelector("#click-drop").value = ''
    })
})