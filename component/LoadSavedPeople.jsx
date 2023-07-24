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

  // 이름 선택
  const handleNameClick = (e) => {
    const clickedName = e.target.innerText;
    const selectedPerson = people.find((person) => person.name === clickedName);
    setSelectedPerson(selectedPerson);
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
          <p>Selected name: {selectedPerson.name}</p>
          <ul>
            {selectedPerson.date.map((date, index) => (
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
    </div>
  );
};

module.exports = LoadSavedPeople;
