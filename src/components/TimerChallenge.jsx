import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [remainingtime, setRemainingTime] = useState(targetTime * 1000);
  const timerIsActive = remainingtime > 0 && remainingtime < targetTime * 1000;

  if (remainingtime <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      setRemainingTime((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);

    // setTimerStarted(true);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={remainingtime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {remainingtime < 0 && <p>You lost!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : " Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer running... " : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
