const timeLabel = document.getElementById("time");
const timerDiv = document.querySelector(".timer");
const sTimeIncBtn = document.getElementById("stinc");
const sTimeDecBtn = document.getElementById("stdec");
const bTimeIncBtn = document.getElementById("btinc");
const bTimeDecBtn = document.getElementById("btdec");
const sTimeDiv = document.getElementById("sessionTime");
const bTimeDiv = document.getElementById("breakTime");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const sessionDiv = document.querySelector(".session");

let sTime = 0;
let bTime = 0;
let session = 1;
let sTimeSec = 0;
let sTimeMin = 0;
let interval = null;

const sessionTimeIncrement = () => {
    sTime += 1;
    sTimeDiv.innerText = `${sTime} min`;
}

const sessionTimeDecrement = () => {
    sTime -= 1;
    sTimeDiv.innerText = `${sTime} min`;
}

const breakTimeIncrement = () => {
    bTime += 1;
    bTimeDiv.innerText = `${bTime} min`;
}

const breakTimeDecrement = () => {
    bTime -= 1;
    bTimeDiv.innerText = `${bTime} min`;
}

const addIncDecListeners = () => {
    sTimeIncBtn.addEventListener('click', () => {
        sessionTimeIncrement();
    });
    
    sTimeDecBtn.addEventListener('click', () => {
        if(sTime>0) sessionTimeDecrement();
    });
    
    bTimeIncBtn.addEventListener('click', () => {
        breakTimeIncrement();
    });
    
    bTimeDecBtn.addEventListener('click', () => {
        if(bTime>0) breakTimeDecrement();
    });
}

addIncDecListeners();

const disableIncDecBtn = () => {
    sTimeDecBtn.disabled = true;
    sTimeIncBtn.disabled = true;
    bTimeDecBtn.disabled = true;
    bTimeIncBtn.disabled = true;
}

const displayTime = () => {
    timeLabel.innerText = `${sTimeMin >= 10 ? sTimeMin : '0'+sTimeMin}:${sTimeSec >= 10 ? sTimeSec : '0'+sTimeSec}`;
}

const startTime = () => {
    if(startBtn.innerText.trim()==='Start') {
        startBtn.innerText = 'Pause';
        disableIncDecBtn();
        interval = setInterval(() => {
            sTimeMin += Math.floor((sTimeSec+1)/60);
            sTimeSec = (sTimeSec+1)%60;
            if(sTimeMin >= sTime && !timerDiv.classList.contains("break")) {
                sTimeMin = 0;
                sTimeSec = 0;
                timerDiv.classList.add("break");
                sessionDiv.innerText = "Break!";
            }
            displayTime();
        }, 1000)
    } else {
        startBtn.innerText = "Start";
        clearInterval(interval);
    }
}

startBtn.addEventListener('click', () => {
    startTime();
})

const reset = () => {
    sTime = 0;
    bTime = 0;
    sTimeDiv.innerText = `${sTime} min`;
    bTimeDiv.innerText = `${bTime} min`;
    addIncDecListeners();
    startBtn.innerText = 'Start';
    sessionDiv.innerHTML = `Session ${session}`;
    timeLabel.innerText = "00:00";
    timerDiv.classList.remove("break");
    clearInterval(interval);
    addIncDecListeners();
}

resetBtn.addEventListener('click', () => {
    session++;
    reset();
})
