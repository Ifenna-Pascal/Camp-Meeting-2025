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
    const countdownDate = new Date("Feb 17, 2025 18:00:00").getTime();
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
    <div data-aos="fade-left" className='flex py-8  border mx-8 mt-12 shadow-sm mb-6 px-4 flex-col items-center justify-center'>
        {
            display ? 
            <>
                <h1 className='uppercase text-center text-semibold pb-4'>WE ARE counting down !!!</h1>

                <span className='text-[17px] font-poppins font-semibold'>{days}Days : {hours}Hrs : {mins}Mins : {secs}Secs</span>
            </>
            : <div>
              <span className='text-[15px] font-montserat text-center'>CAMP MEETING 2025 IS HERE</span>
            </div>
        }
</div>
  )
}

export default Timer 