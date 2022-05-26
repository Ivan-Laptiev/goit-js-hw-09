import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    startBtn: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
    input: document.querySelector("#datetime-picker"),
}

let userDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const delta = selectedDates[0].getTime() - Date.now();
        userDate = selectedDates[0];
        if (delta <= 0) {
            refs.startBtn.setAttribute("disabled", true);            
        } else {
            refs.startBtn.removeAttribute("disabled");
            updateTimePanels(convertMs(delta));
        }
    },
};
flatpickr("#datetime-picker", options);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.onTick = onTick;
    }
        
    start() {
        if (!this.isActive) {
            this.isActive = true;
            refs.input.setAttribute("disabled", true);
            this.intervalId = setInterval(() => {
                const currentTime = Date.now();
                const targetTimeInMs = userDate.getTime();
                const deltaTime = targetTimeInMs - currentTime;
                if (deltaTime <= 0) {
                    clearInterval(this.intervalId);
                } else {
                    this.onTick(convertMs(deltaTime));
                    console.log(deltaTime)
                }
            }, 1000);
            }
    }
}

const timer = new Timer({onTick: updateTimePanels});
refs.startBtn.addEventListener("click", timer.start.bind(timer));
refs.startBtn.setAttribute("disabled", true);

function updateTimePanels(time) {
    console.log(time);
    for (const e in time) {
        refs[e].textContent = addLeadingZero(time[e]);
    };
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2,"0");
};
