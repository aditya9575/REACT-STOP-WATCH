import React, { useState, useRef, useEffect } from 'react';
import './stopwatch.css';

const StopWatch = () => {
  const [userEnteredTime, setUserEnteredTime] = useState(''); // The user's input time in minutes
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false); // To track if the timer is running
  const [isConfirmed, setIsConfirmed] = useState(false); // To check if the user has confirmed the time
  const timerRef = useRef(null); // Ref to hold the timer interval

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Confirming the Time
  const handleConfirmTime = () => {
    if (userEnteredTime > 0) {
      setTimeLeft(userEnteredTime * 60); // Convert minutes to seconds
      setIsConfirmed(true); // Set time as confirmed
    }
  };

  // Handle starting the timer
  const handleTimerStart = () => {
    if (isRunning || !isConfirmed || timeLeft <= 0) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          alert("Time's up!");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Handle pausing and resuming the timer
  const handleTimerPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Handle resetting the timer
  const handleTimerReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setUserEnteredTime('');
    setIsConfirmed(false); // Reset the confirmation status
  };

  useEffect(() => {
    // Clear the timer on component unmount
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
  
      {/* Input for time in minutes */}
      <input
        type="number"
        required
        placeholder="Enter time in minutes"
        value={userEnteredTime}
        onChange={(e) => setUserEnteredTime(e.target.value)}
        disabled={isRunning || isConfirmed}
      />
  
      {/* Confirm Button */}
      {!isConfirmed && (
        <button onClick={handleConfirmTime} disabled={userEnteredTime <= 0}>
          Confirm
        </button>
      )}
  
      {/* Display the formatted time */}
      <div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
  
      {/* Timer controls */}
      <div>
        <button onClick={handleTimerStart} disabled={!isConfirmed || isRunning}>
          Start
        </button>
        <button onClick={handleTimerPause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleTimerReset}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
