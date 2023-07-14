const React = require("react");
const { useState, useEffect } = require("react");
const { LoadPeople } = require("./LoadStorage");

const Modal = ({ closeModal, selectedDate }) => {
  const [dates, setDates] = useState([]);
  const [name, setName] = useState("");

  const { data, saveData } = LoadPeople({ initialDataKey: "userDataAndIndex" });
  const userData = data.userData;
  const currentIndex = data.currentIndex;
  const colors = ["#D2D0F7", "#B2D4D1", "#D9EBD1", "#D4CCB2", "#DB7093"];

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

    //이름과 날짜를 객체로 묶어 로컬 스토리지에 저장
    const newPerson = {
      name: name,
      color: assignColor(),
      date: dates,
    };

    // 새로운 사람 저장
    saveData({
      userData: [...userData, newPerson],
      currentIndex: currentIndex + 1,
    });
    closeModal();
  };

  return (
    <div className="modal">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <div>
        선택한 날짜:{" "}
        {dates && dates.length === 1 ? (
          <p>{dates[0]?.toLocaleDateString()}</p>
        ) : (
          <p>
            {dates[0]?.toLocaleDateString()} ~
            {dates[dates.length - 1]?.toLocaleDateString()}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">이름:</label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

module.exports = Modal;
