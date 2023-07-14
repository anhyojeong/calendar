const React = require("react");
const { useState, useEffect, useRef } = require("react");
const Modal = require('./Modal');
require("../css/calendar.css");

const Body = ({ currentDate }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [isDragging, setIsDragging] = useState(false); //드래그 여부
  const [startDay, setStartDay] = useState(null); //드래그 시작 날짜 저장
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창
  const dragRef = useRef(null); //드래그할 요소 참조 저장

  useEffect(() => {
    setSelectedDays([]);
  }, [currentDate]);

  //요일 표시
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const displayWeeks = weeks.map((week) => <span key={week}>{week}</span>);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysOfPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

  const prevDays = Array.from(
    { length: firstDayOfMonth - 1 },
    (_, i) => daysOfPrevMonth - i
  );
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const remainingCells = 35 - (prevDays.length + currentDays.length);
  const nextDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

  useEffect(() => {
    setSelectedDays([]);
  }, [currentDate]);

  // 날짜를 클릭 했을 때
  const handleDayClick = (day, monthOffset) => {
    const selectedDate = new Date(
      currentYear,
      currentMonth - 1 + monthOffset,
      day,
    );
    setSelectedDays([selectedDate]);
    setIsModalOpen(true);
  };

  //날짜 드래그 시작 했을 때
  const handleDragStart = (day) => {
    setIsDragging(!isDragging);
    setStartDay(day);
  };

  //드래그 중
  const handleDrag = (day) => {
    if (!isDragging) return;

    const startDate = startDay < day ? startDay : day;
    const endDate = startDay > day ? startDay : day;

    const daysInRange = [];
    const start = new Date(currentYear, currentMonth - 1, startDate);
    const end = new Date(currentYear, currentMonth - 1, endDate);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      daysInRange.push(new Date(date));
    }

    setSelectedDays(daysInRange);

  };

  //드래그 끝
  const handleDragStop = () => {
    setIsDragging(false);
    setStartDay(null);

    if (selectedDays.length > 0) {
      setIsModalOpen(true);
    }
    
  };

  //지난 달 날짜 표시
  const renderPrevDays = () => {
    return prevDays.map((day, index) => (
      <div
        className={`day notCurrentDays ${
          selectedDays.some(
            (date) =>
              date.getDate() === day && date.getMonth() === currentMonth - 2
          )
            ? "selected"
            : ""
        }`}
        key={`prev-${index}`}
        onClick={() => handleDayClick(day, -1)} // monthOffset -1로 설정
        onMouseDown={() => handleDragStart(day)}
        onMouseUp={handleDragStop}
        //onMouseLeave={handleDragStop}
        onMouseOver={() => handleDrag(day)}
      >
        {day}
      </div>
    ));
  };

  //해당 달 날짜 표시
  const renderCurrentDays = () => {
    return currentDays.map((day, index) => (
      <div
        className={`day ${
          selectedDays.some(
            (date) =>
              date.getDate() === day && date.getMonth() === currentMonth - 1
          )
            ? "selected"
            : ""
        }`}
        key={`current-${index}`}
        onClick={() => handleDayClick(day, 0)}
        onMouseDown={() => handleDragStart(day)}
        onMouseUp={handleDragStop}
        //onMouseLeave={handleDragStop}
        onMouseOver={() => handleDrag(day)}
        ref={dragRef}
      >
        {day}
      </div>
    ));
  };

  //다음 달 날짜 표시
  const renderNextDays = () => {
    return nextDays.map((day, index) => (
      <div
        className={`day notCurrentDays ${
          selectedDays.some(
            (date) => date.getDate() === day && date.getMonth() === currentMonth
          )
            ? "selected"
            : ""
        }`}
        key={`next-${index}`}
        onClick={() => handleDayClick(day, +1)} // monthOffset +1로 설정
        onMouseDown={() => handleDragStart(day)}
        onMouseUp={handleDragStop}
        //onMouseLeave={handleDragStop}
        onMouseOver={() => handleDrag(day)}
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
      {isModalOpen && (
        <Modal 
          closeModal={() => setIsModalOpen(false)} 
          selectedDate={selectedDays} 
        />
      )}
    </div>
  );
};

module.exports = Body;
