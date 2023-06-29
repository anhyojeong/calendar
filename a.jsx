const React = require('react');
require('./body.css');

const Body =({currentYear, currentMonth})=>{
  const weeks =['일','월','화','수','목','금','토'];
  const displayWeeks = weeks.map((week)=>(<span>{week}</span>));

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth-1, 1).getDay();
  const emptyCells = [];
  const daysOfPreviousMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
  
  // 이전 달
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    emptyCells.push(<div className="day notCurrentDays" key={`previous-${i}`}>{daysOfPreviousMonth - i}</div>);
  }

  // 해당 달
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    emptyCells.push(<div className="day" key={i}>{i}</div>);
  }

  // 다음 달
  const totalCells = emptyCells.length + days.length;
  const remainingCells = 35 - totalCells; // 한 주에 7일씩, 5주분의 셀
  for (let i = 1; i <= remainingCells; i++) {
    emptyCells.push(<div className="day notCurrentDays" key={`next-${i}`}>{i}</div>);
  }

  return (
    <div className="body">
      <div className="weeks">{displayWeeks}</div>
      <div className="days">{emptyCells}</div>
    </div>
  );
}

module.exports = Body;