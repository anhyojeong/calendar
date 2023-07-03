const React = require('react');
const {useState, useEffect} = require('react');
require('./css/calendar.css');


const Body = ({ currentDate }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  console.log(selectedDays);

  useEffect(() => {
    setSelectedDays([]);
  }, [currentDate]);

  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  const displayWeeks = weeks.map((week) => <span key={week}>{week}</span>);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysOfPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

  const prevDays = Array.from({ length: firstDayOfMonth - 1 }, (_, i) => daysOfPrevMonth - i);
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const remainingCells = 35 - (prevDays.length + currentDays.length);
  const nextDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

  // 날짜를 클릭 했을 때
  const handleDayClick = (day) => {
    // 배열selectedDays에서 선택 날짜 유뮤 확인을 위해 인덱스 값 받아오기
    const selectedIndex = selectedDays.indexOf(day);

    //선택 날짜가 있을 때 (인덱스 값 : 0 이상)
    if (selectedIndex > -1) {
      const updatedSelectedDays = [...selectedDays]; //새 배열 생성
      updatedSelectedDays.splice(selectedIndex, 1); // 선택 날짜 빼고 유지
      setSelectedDays(updatedSelectedDays); //selectedDays 업데이트

      //선택 날짜가 없을 때
    } else { 
      setSelectedDays([...selectedDays, day]); // 새 배열 생성해 선택 날짜 추가하고 selectedDays 업데이트
    }
  };

  //지난 달 날짜 표시
  const renderPrevDays = () => {
    return prevDays.map((day, index) => (
      <div
        className={`day notCurrentDays ${selectedDays.includes(day) ? 'selected' : ''}`}
        key={`prev-${index}`}
        onClick={() => handleDayClick(day)}
      >
        {day}
      </div>
    ));
  };

  //해당 달 날짜 표시
  const renderCurrentDays = () => {
    return currentDays.map((day, index) => (
      <div
        className={`day ${selectedDays.includes(day) ? 'selected' : ''}`}
        key={`current-${index}`}
        onClick={() => handleDayClick(day)}
      >
        {day}
      </div>
    ));
  };

  //다음 달 날짜 표시
  const renderNextDays = () => {
    return nextDays.map((day, index) => (
      <div
        className={`day notCurrentDays ${selectedDays.includes(day) ? 'selected' : ''}`}
        key={`next-${index}`}
        onClick={() => handleDayClick(day)}
      >
        {day}
      </div>
    ));
  };

  return (
    <div className="body">
      <div className="weeks">{displayWeeks}</div>
      <div className="days">
        {renderPrevDays()}
        {renderCurrentDays()}
        {renderNextDays()}
      </div>
    </div>
  );
};

module.exports = Body;