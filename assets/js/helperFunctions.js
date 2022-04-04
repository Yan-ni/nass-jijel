function intToStringof2(number)
{
  if(number >= 10)
    return number.toString();

  return "0" + number;
}

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
    time.seconds = 60 + time.seconds - time2.seconds;
  } else {
    time.seconds = time.seconds - time2.seconds;
  }
  
  if(time1.minutes < time2.minutes) {
    --time.hours;
    time.minutes = 60 + time.minutes - time2.minutes;
  } else {
    time.minutes = time.minutes - time2.minutes;
  }

  time.hours = time.hours - time2.hours;

  return time;
}