const React = require("react");
const { useState, useEffect } = require("react");
const { LoadStorage } = require("./LoadStorage");
require("../css/modal.css");

const Modal = ({ closeModal, selectedDate }) => {
  const [dates, setDates] = useState([]);
  const [name, setName] = useState("");

  const { data, saveData } = LoadStorage({
    initialDataKey: "userDataAndIndex",
  });
  const userData = data.userData;
  const currentIndex = data.currentIndex;
  const colors = [
    "#D2D0F7",
    "#B2D4D1",
    "#D9EBD1",
    "#D4CCB2",
    "#DB7093",
    "#A1CCD1",
    "#E9B384",
    "#7C9D96",
  ];

  //선택된 날짜
  useEffect(() => {
    if (selectedDate && selectedDate.length > 0) {
      setDates([...selectedDate]);
    }
  }, [selectedDate]);

  //이름 입력할 때
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  //색상 할당
  const assignColor = () => {
    const assignedColor = colors[currentIndex % colors.length];
    return assignedColor;
  };

  //제출
  const handleSubmit = (event) => {
    event.preventDefault();

    // userData 배열에서 이름이 이미 존재하는지 확인
    const existingPersonIndex = userData.findIndex(
      (person) => person.name === name
    );

    if (existingPersonIndex !== -1) {
      // 이름이 있으면 업데이트
      const updatedUserData = [...userData];
      const existingPerson = updatedUserData[existingPersonIndex];
      existingPerson.date = [...existingPerson.date, ...dates]; //날짜 추가
      saveData({ userData: updatedUserData });
    } else {
      // 이름이 없으면 새로운 객체 생성
      const newPerson = {
        name: name,
        color: assignColor(),
        date: dates,
      };

      // 새로운 사람 추가
      saveData({
        userData: [...userData, newPerson],
        currentIndex: currentIndex + 1,
      });
    }

    closeModal();
  };

  return (
    <div className="modalContainer">
      <div id="modal">
        <div id="modalHead">
          {dates && dates.length === 1 ? (
            <p>{dates[0]?.toLocaleDateString()}</p>
          ) : (
            <p>
              {dates[0]?.toLocaleDateString()} ~
              {dates[dates.length - 1]?.toLocaleDateString()}
            </p>
          )}
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <form id="modalForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nameInput">이름:</label>
            <input
              type="text"
              placeholder="이름 입력 후 추가를 눌러주세요 "
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  );
};

module.exports = Modal;
