const date = new Date();

const API_URI = `https://api.aladhan.com/v1/calendarByCity?city=Jijel&country=Algeria&method=4&month=${date.getMonth() +1}&year=${date.getFullYear()}`;

const jsonTimes = [
  {
    "day": 1,
    "imsak": "04:45",
    "iftar": "19:04"
  },
  {
    "day": 2,
    "imsak": "04:43",
    "iftar": "19:05"
  },
  {
    "day": 3,
    "imsak": "04:41",
    "iftar": "19:06"
  },
  {
    "day": 4,
    "imsak": "04:40",
    "iftar": "19:07"
  },
  {
    "day": 5,
    "imsak": "04:38",
    "iftar": "19:08"
  },
  {
    "day": 6,
    "imsak": "04:36",
    "iftar": "19:09"
  },
  {
    "day": 7,
    "imsak": "04:35",
    "iftar": "19:10"
  },
  {
    "day": 8,
    "imsak": "04:33",
    "iftar": "19:10"
  },
  {
    "day": 9,
    "imsak": "04:31",
    "iftar": "19:11"
  },
  {
    "day": 10,
    "imsak": "04:30",
    "iftar": "19:12"
  },
  {
    "day": 11,
    "imsak": "04:28",
    "iftar": "19:13"
  },
  {
    "day": 12,
    "imsak": "04:26",
    "iftar": "19:14"
  },
  {
    "day": 13,
    "imsak": "04:25",
    "iftar": "19:15"
  },
  {
    "day": 14,
    "imsak": "04:23",
    "iftar": "19:16"
  },
  {
    "day": 15,
    "imsak": "04:21",
    "iftar": "19:17"
  },
  {
    "day": 16,
    "imsak": "04:20",
    "iftar": "19:17"
  },
  {
    "day": 17,
    "imsak": "04:18",
    "iftar": "19:18"
  },
  {
    "day": 18,
    "imsak": "04:17",
    "iftar": "19:19"
  },
  {
    "day": 19,
    "imsak": "04:15",
    "iftar": "19:20"
  },
  {
    "day": 20,
    "imsak": "04:13",
    "iftar": "19:21"
  },
  {
    "day": 21,
    "imsak": "04:12",
    "iftar": "19:22"
  },
  {
    "day": 22,
    "imsak": "04:10",
    "iftar": "19:23"
  },
  {
    "day": 23,
    "imsak": "04:09",
    "iftar": "19:24"
  },
  {
    "day": 24,
    "imsak": "04:07",
    "iftar": "19:24"
  },
  {
    "day": 25,
    "imsak": "04:05",
    "iftar": "19:25"
  },
  {
    "day": 26,
    "imsak": "04:04",
    "iftar": "19:26"
  },
  {
    "day": 27,
    "imsak": "04:02",
    "iftar": "19:27"
  },
  {
    "day": 28,
    "imsak": "04:01",
    "iftar": "19:28"
  },
  {
    "day": 29,
    "imsak": "03:59",
    "iftar": "19:29"
  },
  {
    "day": 30,
    "imsak": "03:58",
    "iftar": "19:30"
  }
 ]


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
var imsakTime = '';

async function displayTime()
{
  const iftarTimeEl = document.querySelector('.iftar > .time');
  const imsakTimeEl = document.querySelector('.imsak > .time');
  const hijriDateEl = document.querySelector('.hijriDate');

  const times = await getTodayAdhanTimes();

  console.log(times);

  const { iftar, imsak } = jsonTimes.find(time => time.day === parseInt(times.date.hijri.day));

  iftarTime = iftar;
  imsakTime = imsak;

  iftarTimeEl.textContent = iftarTime;
  imsakTimeEl.textContent = imsakTime;

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