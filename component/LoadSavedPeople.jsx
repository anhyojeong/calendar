const React = require("react");
const { useState, useEffect } = require("react");
const { LoadStorage } = require("../hooks/LoadStorage");
require("../css/personArea.css");

const LoadSavedPeople = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { data, saveData } = LoadStorage({
    initialDataKey: "userDataAndIndex",
  });

  // 로컬스토리지에서 저장된 정보를 가져옴
  useEffect(() => {
    setPeople(data.userData);
  }, [data.userData]);

  // 가져온 날짜 포맷
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}. ${month}. ${day}`;
  };
  // 연속 날짜
  const findContinuousDateRanges = (dates) => {
    // 날짜 정렬 (작 -> 큰 )
    const sortedDates = dates
      .map((date) => new Date(date))
      .sort((a, b) => a - b);
    const ranges = []; //연속된 날짜 저장
    let currentRange = [sortedDates[0]]; //현재 연속된 날짜 저장

    //연속된 날짜인지
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const prevDate = sortedDates[i - 1];
      const diffInDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24); //밀리초로 계산된 하루 시간

      if (diffInDays === 1) {
        //연속 날짜
        currentRange.push(currentDate);
      } else {
        ranges.push(currentRange); //비연속 날짜
        currentRange = [currentDate];
      }
    }

    ranges.push(currentRange);
    return ranges;
  };

  //연속 날짜 포맷
  const formatContinuousDateRanges = (ranges) => {
    return ranges.map((range) => {
      const startDate = range[0];
      const endDate = range[range.length - 1];
      if (startDate === endDate) {
        return formatDate(startDate);
      } else {
        return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
      }
    });
  };

  // 이름 선택
  const handleNameClick = (e) => {
    const clickedName = e.target.innerText;
    const clickedPerson = people.find((person) => person.name === clickedName);
    setIsClicked(!isClicked);
    setSelectedPerson((prevSelectedPerson) => {
      if (prevSelectedPerson?.name === clickedName) {
        setIsClicked(false);
        return null;
      } else {
        return clickedPerson;
      }
    });
  };

  // 일정 삭제
  const handleRemove = (index) => {
    if (!selectedPerson) return;

    const updatedPersonDates = selectedPerson.date.filter(
      (date, idx) => idx !== index
    );

    //로컬 스토리지에서 해당 날짜만 변경하도록
    const newUserData = data.userData
      .map((person) => {
        if (person.name === selectedPerson.name) {
          return { ...person, date: updatedPersonDates };
        }
        return person;
      })
      .filter((person) => person.date.length > 0); // 날짜가 남아있는 사람만 필터링

    const newData = {
      userData: newUserData,
      currentIndex: data.currentIndex,
    };

    saveData(newData);
  };

  return (
    <div id="savedPeopleContainer">
      <div className="savedPeopleNameList">
        {people.length > 0
          ? people.map((person, index) => (
              <span
                key={index}
                onClick={handleNameClick}
                style={{ backgroundColor: person.color }}
              >
                {person.name}
              </span>
            ))
          : null}
      </div>
      {selectedPerson && (
        <div className="personScheduleContainer">
          <p id="clickedPerson">{selectedPerson.name}의 일정</p>
          <ul id="clickedPersonSchedule">
            {selectedPerson.date.length > 1 //연속 날짜
              ? formatContinuousDateRanges(
                  findContinuousDateRanges(selectedPerson.date)
                ).map((date, index) => (
                  <li key={index}>
                    {date}
                    <span id="removeBtn" onClick={() => handleRemove(index)}>
                      &times;
                    </span>
                  </li>
                ))
              : //비연속 날짜
                selectedPerson.date.map((date, index) => (
                  <li key={index}>
                    {formatDate(date)}
                    <span className="close" onClick={() => handleRemove(index)}>
                      &times;
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      )}
      {!selectedPerson && !isClicked && (
        <p id ="message">일정 등록 후 이름을 누르면 일정을 볼 수 있어요</p>
      )}
    </div>
  );
};

module.exports = LoadSavedPeople;
