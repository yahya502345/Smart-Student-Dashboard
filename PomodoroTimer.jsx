import { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div>
      <h2>Study Timer</h2>
      <p>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setSecondsLeft(25 * 60);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default PomodoroTimer;