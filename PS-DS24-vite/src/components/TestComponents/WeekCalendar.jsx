import React, { useState, useEffect } from 'react';
import './WeekCalendar.css';

const WeekCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState([]);

  // Función para obtener la semana actual
  const getCurrentWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Lunes
    const days = [];

    // Añadir los 7 días de la semana a la lista de días
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, []);

  return (
    <div className='wnd'>
        <div className="weekCalendarContainer">
        {currentWeek.map((day, index) => (
            <div className="weekDay" key={index}>
            <div className="dayName">{day.toLocaleDateString('en-US', { weekday: 'long' })}</div>
            <div className="dayNumber">{day.getDate()}</div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default WeekCalendar;
