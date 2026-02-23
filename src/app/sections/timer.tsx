/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from "react";

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
    const countdownDate = new Date("March 2, 2026 18:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
    <div className="flex py-2 w-[70%]  md:w-[40%] mx-auto border mt-8 shadow-2xl text-white mb-6 px-2 flex-col items-center justify-center bg-black/20">
      {display ? (
        <>
          <h1 className="uppercase text-center text-[1rem] md:text-[2rem] pb-4">
            WE ARE counting down !!!
          </h1>

          <span className="text-[1rem] md:text-[2rem] font-poppins font-semibold">
            {days}Days : {hours}Hrs : {mins}Mins : {secs}Secs
          </span>
        </>
      ) : (
        <div>
          <span className="text-[15px] font-montserat text-center">
            CAMP MEETING 2025 IS HERE
          </span>
        </div>
      )}
    </div>
  );
};

export default Timer;
