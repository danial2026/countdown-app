import React, { useState, useEffect } from 'react';
import './App.css';

const Countdown = () => {
  const [countdown, setCountdown] = useState('');
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date('January 1, 2026 00:00:00');
      const startDate = new Date('January 1, 2023 00:00:00');
      const now = new Date().getTime();
      const distanceTotal = targetDate - startDate;
      const distanceRemaining = targetDate - now;
      const percentage = ((distanceTotal - distanceRemaining) / distanceTotal) * 100;

      const days = Math.floor(distanceRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distanceRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distanceRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distanceRemaining % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setPercentage(percentage.toFixed(3));

      if (distanceRemaining < 0) {
        clearInterval(interval);
        setCountdown('EXPIRED');
        setPercentage(100);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-text">Countdown to January 1, 2026:</div>
      <div className="countdown">{countdown}</div>
      <div className="percentage">{percentage}% completed</div>
    </div>
  );
};

const Calendar = () => {
  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate calendar days
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="container">
      <div className="calendar-container">
        <h1>{currentMonth} {currentYear}</h1>
        <div className="calendar">
          {calendarDays.map((day) => (
            <div
              key={day}
              className={`day ${day === currentDate.getDate() ? 'today' : ''}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
    <div className="app-container">
      <Countdown />
      {/* <Calendar /> */}
    </div>
    <Calendar />
    </div>
  );
};

export default App;

