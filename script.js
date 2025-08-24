const startDays = 8;
const startHours = 23;
const startMinutes = 55;
const startSeconds = 41;

const now = new Date();
const targetDate = new Date(
  now.getTime() +
  (startDays * 24 * 60 * 60 * 1000) +
  (startHours * 60 * 60 * 1000) +
  (startMinutes * 60 * 1000) +
  (startSeconds * 1000)
);

let prevTime = {days: null, hours: null, minutes: null, seconds: null};

function getTimeSegmentElements(segementElement) {
    if (!segementElement) return null;

    const segementDisplay = segementElement.querySelector('.segement-display');
    
    if (!segementDisplay) return null;


    const segementDisplayTop = segementDisplay
        .querySelector('.segement-display_top');
    const segementDisplayBottom = segementDisplay
        .querySelector('.segement-display_bottom');
    const segementOverlay = segementDisplay
        .querySelector('.segement-overlay');

        if (!segementOverlay) return null;

    const segementOverlayTop = segementOverlay
        .querySelector('.segement-overlay_top');
    const segementOverlayBottom = segementOverlay
        .querySelector('.segement-overlay_bottom');

    return{
        segementDisplayTop,
        segementDisplayBottom,
        segementOverlay,
        segementOverlayTop,
        segementOverlayBottom
    }
}

function updateSegementValues(displayElement, overlayElement, value) {
    displayElement.textContent = value;
    overlayElement.textContent = value;
}

function updateTimeSegement(segementElement, timeValue) {
    const segementElements = getTimeSegmentElements(segementElement);

        if (!segementElements) return;
    segementElements.segementOverlay.classList.add('flip');

    updateSegementValues(
        segementElements.segementDisplayTop,
        segementElements.segementOverlayBottom,
        timeValue
    );



    function finishAnimination() {
        segementElements.segementOverlay.classList.remove('flip');
        updateSegementValues(
            segementElements.segementDisplayBottom,
            segementElements.segementOverlayTop,
            timeValue
        );
        this.removeEventListener('animationend', finishAnimination)
    }
    segementElements.segementOverlay.addEventListener(
        'animationend',
        finishAnimination
    )
}

function updateTimeSection(sectionID, timeValue) {
    const number = timeValue;
    const sectionElement = document
        .getElementById(sectionID);

    const timeSegments = document
        .querySelectorAll('.time-segement');
    updateTimeSegement(sectionElement, number);
}
function getTimeRemaining(targetDateTime) {
    const nowTime = Date.now();
    const secondsRemaining = 
    Math.floor((targetDateTime - nowTime) /1000);

    if (secondsRemaining <= 0) {
        return{days: '00', hours: '00', minutes: '00', seconds: '00', done: true}
    }
    

    let days = Math.floor(secondsRemaining  / 86400);
    let hours = Math.floor((secondsRemaining % 86400) / 3600);
    let minutes = Math.floor((secondsRemaining % 3600) / 60);
    let seconds = secondsRemaining % 60;


    days = String(days).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
   

    return{
        seconds,
        minutes,
        hours,
        days
    };
}

function updateAllSegements() {
    const targetTimeStamp = new Date(targetDate).getTime();
    const timeRemainingBits = getTimeRemaining(targetTimeStamp);
    if (timeRemainingBits.days !== prevTime.days){
         updateTimeSection('days', timeRemainingBits.days);
    }
    if (timeRemainingBits.hours !== prevTime.hours) {
        updateTimeSection('hours', timeRemainingBits.hours);
    }
    if (timeRemainingBits.minutes !== prevTime.minutes) {
        updateTimeSection('minutes', timeRemainingBits.minutes);
    }
    if (timeRemainingBits.seconds !== prevTime.seconds) {
         updateTimeSection('seconds', timeRemainingBits.seconds);
    }

   
    
    
   prevTime = {...timeRemainingBits};

}

const countdownTimer = setInterval(() => {
 updateAllSegements();  
}, 1000)
updateAllSegements();