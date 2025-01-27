/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

const Timer = () => {

      // timer counter state
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [mins, setMins] = useState("00");
  const [secs, setSecs] = useState("00");
  const [display, setDisplay] = useState(false);
  let interval = useRef(null);

  // time counter function
  const startTimer = () => {
    const countdownDate = new Date("Feb 17, 2025 12:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        setDisplay(false);
      } else {
        setDisplay(true);
        setDays(days.toString());
        setHours(hours.toString());
        setMins(mins.toString());
        setSecs(secs.toString());
      }
    }, 1000) as any;
  };

  // countdown functionality on load
  useEffect(() => {
    startTimer();
    const currentValue = interval.current;
    return () => {
      clearInterval(currentValue as any);
    };
  }, []);


  return (
    <div className='flex py-16 px-4 flex-col items-center justify-center'>
      <h1 className='uppercase text-center text-semibold pb-4'>WE ARE counting down !!!</h1>
        {
            display && 
    <span className='text-[24px] font-bold'>{days}Days : {hours}Hrs : {mins}Mins : {secs}Secs</span>
            
        }
</div>
  )
}

export default Timer 