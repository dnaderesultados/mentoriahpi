import React, { useState, useEffect } from 'react';

// Defina a data final da sua promoção aqui
const COUNTDOWN_TARGET = new Date("2025-10-12T23:59:59");

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const total = COUNTDOWN_TARGET - new Date();
      
      if (total <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg inline-block mb-4 animate-pulse">
        <p className="text-lg text-white font-montserrat mb-2">A OFERTA TERMINA EM:</p>
        <div className="text-3xl font-bold text-orange-500 tracking-wider space-x-2">
          <span>--d</span> : <span>--h</span> : <span>--m</span> : <span>--s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg inline-block mb-4">
      <p className="text-lg text-white font-montserrat mb-2">A OFERTA TERMINA EM:</p>
      <div className="text-3xl font-bold text-orange-500 tracking-wider space-x-2">
        <span>{timeLeft.days.toString().padStart(2, '0')}d</span>
        <span>:</span>
        <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
        <span>:</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
        <span>:</span>
        <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;