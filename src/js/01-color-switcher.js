const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector(["[data-stop]"]);

let timerId = null;
stopBtn.setAttribute("disabled", true);

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {
    changeColor()
    timerId = setInterval(() => {
        changeColor()
    }, 1000);
    
    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
}

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
}

function changeColor() {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;

}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
