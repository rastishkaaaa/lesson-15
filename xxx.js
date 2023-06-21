const hoursSelect = document.getElementById('hours');
const minutesSelect = document.getElementById('minutes');
const secondsSelect = document.getElementById('seconds');
const ampmSelect = document.getElementById('ampm');
const currentTime = document.getElementById('currentTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const settingAlarm = document.querySelector('.setting-alarm');

let alarmTime,
   ringtone = new Audio('signal.mp3'),
   alarmSet = false;

for (let i = 1; i <= 12; i++) {
   let option = document.createElement('option');
   option.value = i < 10 ? '0' + i : i;
   option.innerText = i < 10 ? '0' + i : i;
   hoursSelect.appendChild(option);
}

for (let i = 0; i <= 59; i++) {
   let option = document.createElement('option');
   option.value = i < 10 ? '0' + i : i;
   option.innerText = i < 10 ? '0' + i : i;
   minutesSelect.appendChild(option);
   secondsSelect.appendChild(option.cloneNode(true));
}

function updateTime() {
   let timeClock = new Date();
   let h = timeClock.getHours();
   let m = timeClock.getMinutes();
   let s = timeClock.getSeconds();
   let halfDay = "AM";

   if (h > 12) {
      h = h - 12;
      halfDay = "PM";
   }

   h = h === 0 ? 12 : h;
   h = h < 10 ? "0" + h : h;
   m = m < 10 ? "0" + m : m;
   s = s < 10 ? "0" + s : s;

   currentTime.innerHTML = `${h}:${m}:${s} ${halfDay}`;

   if (alarmTime == `${h}:${m}:${s} ${halfDay}`) {
      console.log('Alarm!!!');
      ringtone.play();
      ringtone.loop = true;
   }
}

setInterval(updateTime, 1000);

function setAlarm() {
   if (alarmSet) {
      alarmTime = '';
      ringtone.pause();
      settingAlarm.classList.remove('disabled');
      setAlarmBtn.innerText = 'Встановити Будильник';
      alarmSet = false;
   } else {
      const hours = hoursSelect.value;
      const minutes = minutesSelect.value;
      const seconds = secondsSelect.value;
      const ampm = ampmSelect.value;

      if (hours === 'Hour' || minutes === 'Minute' || seconds === 'Second' || ampm === '') {
         alert('Перевірте налаштування будильника!');
         return;
      }

      alarmTime = `${hours}:${minutes}:${seconds} ${ampm}`;
      settingAlarm.classList.add('disabled');
      setAlarmBtn.innerText = 'Вимкнути Будильник';
      alarmSet = true;
   }
}

setAlarmBtn.addEventListener('click', setAlarm);