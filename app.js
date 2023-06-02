// Input Selectors

const dayInput = document.querySelector("#dy")
const monthInput = document.querySelector("#mo")
const yearInput = document.querySelector("#yr")
const invalid = document.querySelector("#invalid")

// Button Selector

const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");

// Timer Selector

const days = document.querySelector("#day")
const hours = document.querySelector("#hour")
const minutes = document.querySelector("#minute")
const seconds = document.querySelector("#second")

// Important Variables

let intervalId;
let inputTimer;

if(localStorage.getItem("timer")!=null){
    submit.setAttribute("disabled", true)
    submit.classList.add("disabled");
    inputTimer = localStorage.getItem("timer");
    inputTimer = new Date(inputTimer);
    startTimer(inputTimer);
    
}


submit.addEventListener("click", ()=>{
    let d = dayInput.value;
    let m = monthInput.value;
    let y = yearInput.value;
    inputTimer = new Date(`${y}/${m}/${d}`);
    
    let currDate = new Date();
    if(inputTimer>=currDate && d>0 && d<=31 && m>0 && m<=12){
        invalid.style.display = "none";
        if(localStorage.getItem("timer")==null){
            submit.setAttribute("disabled", true)
            submit.classList.add("disabled");
            localStorage.setItem("timer",inputTimer);
            startTimer(new Date(inputTimer));

        }
    }
    else{
        console.log("Invalid timer");
        invalid.style.display = "block";
        rst();
    }
});

reset.addEventListener("click",()=>{
    clearInterval(intervalId);
    submit.removeAttribute("disabled");
    submit.classList.remove("disabled");
    rst();
    localStorage.removeItem("timer");
})

function rst(){
    seconds.textContent = "00"
    minutes.textContent ="00"
    hours.textContent ="00"
    days.textContent = "00"
    console.log("reseted");
    dayInput.value=monthInput.value=yearInput.value="";
}


function startTimer(inputTimer)
{

    const sec = 1000;
    const min = sec*60;
    const hour = min*60;
    const day = hour*24;
    intervalId = setInterval(() => {
        let currDate = new Date();
        let differnce = inputTimer.getTime()-currDate.getTime();
        let leftDay = Math.floor((differnce/day));
        let lefthour = Math.floor((differnce%day)/hour);
        let leftMin = Math.floor((differnce%hour)/min);
        let leftSec = Math.floor((differnce%min)/sec);
        seconds.textContent = leftSec.toString().padStart(2,0)
        minutes.textContent = leftMin.toString().padStart(2,0);
        hours.textContent = lefthour.toString().padStart(2,0);
        days.textContent = leftDay.toString().padStart(2,0);
        if(differnce<0) {
            clearInterval(intervalId);
        }
    }, 0);
}