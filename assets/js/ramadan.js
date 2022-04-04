const date = new Date();

const API_URI = `http://api.aladhan.com/v1/calendarByCity?city=Jijel&country=Algeria&method=4&month=${date.getMonth() +1}&year=${date.getFullYear()}`;

function getTodayAdhanTimes()
{
  return fetch(API_URI)
    .then(res => res.json())
    .then(res => res.data[date.getDate() -1])
    .catch(error => console.error(error));
} 

function incrementStringof2(string)
{
  if(parseInt(string) >= 10)
    return string;

  return "0" + (parseInt(string) +1);
}

async function displayTime()
{
  const iftarTime = document.querySelector('.iftar > .time');
  const imsakTime = document.querySelector('.imsak > .time');
  const hijriDate = document.querySelector('.hijriDate');

  const times = await getTodayAdhanTimes();

  iftarTime.textContent = times.timings.Maghrib.split(' ')[0];
  imsakTime.textContent = times.timings.Imsak.split(' ')[0];

  const hijri = times.date.hijri;

  hijriDate.textContent = [hijri.weekday.ar, incrementStringof2(hijri.day), hijri.month.ar, hijri.year].join(' ');
}


displayTime();