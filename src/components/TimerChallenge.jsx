import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
// let timer;
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
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
        remainingTime={timeRemaining}
        onClose={onreset}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timeRemaining && <p>You lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "S" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running" : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
