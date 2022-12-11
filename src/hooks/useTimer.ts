import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = (minuteTime: number) => {
  const [timer, setTimer] = useState('');
  const [timerEnd, setTimerEnd] = useState(false);

  const intervalID = useRef<any>();

  const startTimer = useCallback(() => {
    setTimer('');
    // update timer here
    let time = minuteTime * 60;

    function updateCountDown() {
      // console.log(time, "time");
      const minutes = Math.floor(time / 60);
      let seconds: string | number = Math.trunc(time % 60);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      time--;
      setTimer(minutes + ':' + seconds);
      if (minutes < 0 && seconds === '00') {
        setTimerEnd(true);
        clearInterval(intervalID.current);
      }
      return minutes + ':' + seconds;
    }

    if (!timerEnd && time > 0) intervalID.current = setInterval(updateCountDown, 1000);

    return () => {
      window.clearInterval(intervalID.current);
      clearInterval(intervalID.current);
    };
  }, [minuteTime, timerEnd]);

  useEffect(() => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
    }
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (
      timer === '0:00' ||
      (parseInt(timer.split(':')[0]) <= 0 && parseInt(timer.split(':')[1]) < 0)
    ) {
      clearInterval(intervalID.current);
      setTimer('');
      setTimerEnd(true);
    }
  }, [timer]);
  return { timer, timerEnd, setTimerEnd, startTimer };
};

export default useTimer;
