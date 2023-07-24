const React = require("react");
const { useState, useEffect } = require("react");
const { LoadStorage } = require("./LoadStorage");
require("../css/personArea.css");

const LoadSavedPeople = () => {
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

  //이름 선택
  const handleNameClick = (e) => {
    const clickedName = e.target.innerText;

    //선택된 이름 스토리지에 있는지 확인하고 날짜 가져오기
    const selectedPerson = people.find((person) => person.name === clickedName);
    setSelectedPerson(selectedPerson);
  };

  //일정 삭제
  const handleRemove = (e) => {
  };

  return (
    <div id="savedPeopleArea">
      {people.length > 0
        ? people.map((person, index) => (
            <div className="savedPersonName" key={index}>
              <span
                onClick={handleNameClick}
                style={{ backgroundColor: person.color }}
              >
                {person.name}
              </span>
            </div>
          ))
        : null}
      {selectedPerson && (
        <div>
          <p>선택된 이름: {selectedPerson.name}</p>
          <ul>
            {selectedPerson.date.length > 1 //연속 날짜
              ? formatContinuousDateRanges(
                  findContinuousDateRanges(selectedPerson.date)
                ).map((date, index) => (
                  <li key={index}>
                    {date}
                    <span className="close" onClick={handleRemove}>
                      &times;
                    </span>
                  </li>
                ))
              : //비연속 날짜
                selectedPerson.date.map((date, index) => (
                  <li key={index}>
                    {formatDate(date)}
                    <span className="close" onClick={handleRemove}>
                      &times;
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

module.exports = LoadSavedPeople;
