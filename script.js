// hap = g/8 (tend)2

var h1 = document.getElementsByTagName('h1')[0];
var h2 = document.getElementsByTagName('h2')[0];
var h3 = document.getElementsByTagName('h3')[0];
var h4 = document.getElementsByTagName('h4')[0];
var startTime = null;
var endTime = null;
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

function add() {
    seconds++;
    if (seconds >= 10) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : seconds + "0");

    timer();
}
function timer() {
    if (!startTime) {
      clear();
      startTime = new Date().getTime();
      document.onclick = stopper;
    }
    t = setTimeout(add, 100);
}

/* Start button */
document.onclick = timer;

/* Stop button */
function stopper() {
    endTime = new Date().getTime();
    clearTimeout(t);
    var heightInMeters = littlefieldsLaw(startTime, endTime);
    h1.textContent = heightInMeters + " meters";
    h2.textContent = (heightInMeters * 3.28084).toFixed(2) + " feet";
    h3.textContent = ((endTime - startTime)/1000).toFixed(2) + " seconds"
    h4.textContent = "Tap again to restart"
    startTime = null;
    endTime = null;
    document.onclick = timer;
}

/* Clear button */
function clear() {
    h1.textContent = "00:00:00";
    h2.textContent = "";
    h3.textContent = "";
    h4.textContent = "";
    seconds = 0; minutes = 0; hours = 0;
}

function littlefieldsLaw(startTime, endTime) {
  var elapsedTimeInSeconds = (endTime - startTime)/1000;
  return (1.225 * Math.pow(elapsedTimeInSeconds, 2)).toFixed(2);
}