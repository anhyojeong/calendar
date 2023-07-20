const React = require("react");
const { useState, useEffect, useRef } = require("react");
const Modal = require("./Modal");
const { LoadStorage } = require("./LoadStorage");

require("../css/calendar.css");

const Body = ({ currentDate }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [savedData, setSavedData] = useState({});
  const [isDragging, setIsDragging] = useState(false); //드래그 여부
  const [startDay, setStartDay] = useState(null); //드래그 시작 날짜 저장
  const [isModalOpen, setIsModalOpen] = useState(false); //모달창
  const dragRef = useRef(null); //드래그할 요소 참조 저장

  const { data, saveData } = LoadStorage({
    initialDataKey: "userDataAndIndex",
  });

  useEffect(() => {
    setSelectedDays([]);
  }, [currentDate]);

  // 로컬스토리지에서 저장된 정보를 가져옴
  useEffect(() => {
    if (data.userData) {
      setSavedData(data);
    }
  }, [data.userData]);

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

  // 날짜를 클릭 했을 때
  const handleDayClick = (day, monthOffset) => {
    const selectedDate = new Date(
      currentYear,
      currentMonth - 1 + monthOffset,
      day
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

  const renderDays = (days, monthOffset) => {
    return days.map((day, index) => {
      const date = new Date(currentYear, currentMonth - 1 + monthOffset, day);
      const isDateSelected = selectedDays.some(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      );

      const matchingUserDatas = data.userData?.filter((userData) =>
        userData.date.some(
          (storedDate) => new Date(storedDate).getTime() === date.getTime()
        )
      );

      return (
        <div
          className={`day ${monthOffset !== 0 ? "notCurrentDays" : ""} ${
            isDateSelected ? "selected" : ""
          }`}
          key={`day-${monthOffset}-${index}`}
          onClick={() => handleDayClick(day, monthOffset)}
          onMouseDown={() => handleDragStart(day)}
          onMouseUp={handleDragStop}
          onMouseOver={() => handleDrag(day)}
        >
          {day}
          {matchingUserDatas &&
            matchingUserDatas.map((matchingUserData, innerIndex) => {
              const color = matchingUserData ? matchingUserData.color : null;
              return (
                <div
                  key={`inner-${monthOffset}-${index}-${innerIndex}`}
                  ref={dragRef}
                  className="line"
                  style={{ borderBottom: color ? `10px solid ${color}` : "" }}
                ></div>
              );
            })}
        </div>
      );
    });
  };

  return (
    <div className="body">
      <div className="weeks">{displayWeeks}</div>
      <div className="days">
        {renderDays([...prevDays].reverse(), -1)}
        {renderDays(currentDays, 0)}
        {renderDays(nextDays, 1)}
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
