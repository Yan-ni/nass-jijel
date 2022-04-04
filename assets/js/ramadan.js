const date = new Date();

const API_URI = `https://api.aladhan.com/v1/calendarByCity?city=Jijel&country=Algeria&method=4&month=${date.getMonth() +1}&year=${date.getFullYear()}`;

function getTodayAdhanTimes()
{
  return fetch(API_URI)
    .then(res => res.json())
    .then(res => res.data[date.getDate() -1])
    .catch(error => console.error(error));
} 

function intToStringof2(number)
{
  if(parseInt(number) >= 10)
    return number.toString();

  return "0" + number;
}

var iftarTime = '';

async function displayTime()
{
  const iftarTimeEl = document.querySelector('.iftar > .time');
  const imsakTimeEl = document.querySelector('.imsak > .time');
  const hijriDateEl = document.querySelector('.hijriDate');

  const times = await getTodayAdhanTimes();

  iftarTime = times.timings.Maghrib.split(' ')[0];

  iftarTimeEl.textContent = iftarTime;
  imsakTimeEl.textContent = times.timings.Imsak.split(' ')[0];

  const hijri = times.date.hijri;

  hijriDateEl.textContent = [hijri.weekday.ar, intToStringof2(parseInt(hijri.day) +1), hijri.month.ar, hijri.year].join(' ');
}


displayTime();

setInterval(() => {
  const hours = document.querySelector('.timeRemaining > .hours');
  const minutes = document.querySelector('.timeRemaining > .minutes');
  const seconds = document.querySelector('.timeRemaining > .seconds');

  const d = new Date()

  const [iftarHours, iftarMinutes] = iftarTime.split(':');
  const iftarSeconds = '00';

  const remaining = timeSubtract({
    hours: iftarHours,
    minutes: iftarMinutes,
    seconds: iftarSeconds
  }, {
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds()
  });

  // if(remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0)
    // document.querySelector('.timeRemaining').classList.add('timesup');

  hours.textContent = intToStringof2(remaining.hours)
  minutes.textContent = intToStringof2(Math.abs(remaining.minutes))
  seconds.textContent = intToStringof2(Math.abs(remaining.seconds))
}, 1000);

function timeSubtract(time1, time2)
{
  const time = { ...time1 };

  if(time.hours < time2.hours)
  {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  } else if(time.hours === time2.hours) {
    if(time.minutes < time2.minutes) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    } else if(time.minutes === time2.minutes && time.seconds <= time2.seconds) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
    }
  }

  if(time1.seconds < time2.seconds)
  {
    --time.minutes;
    time.seconds = (60 + parseInt(time.seconds)) - time2.seconds;
  } else {
    time.seconds = time.seconds - time2.seconds;
  }
  
  if(time1.minutes < time2.minutes) {
    --time.hours;
    time.minutes = (60 + parseInt(time.minutes)) - time2.minutes;
  } else {
    time.minutes = time.minutes - time2.minutes;
  }


  time.hours = time.hours - time2.hours;

  return time;
}