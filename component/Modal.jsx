const React = require("react");
const { useState, useEffect } = require("react");
const { LoadPeople } = require("./LoadPeople");

const Modal = ({ closeModal, selectedDate }) => {
  const [date,setDate] = useState([]);
  const [name, setName] = useState("");

  const { data: people, saveData } = LoadPeople({ initialDataKey: "userData" });
  const { data: currentIndex, saveData: saveCurrentIndex } = LoadPeople({ initialDataKey: "currentIndex" });
  
  const month = selectedDate.getMonth()+1;
  const day = selectedDate.getDate();
  const colors = ["#D2D0F7", "#B2D4D1", "#D9EBD1", "#D4CCB2", "#DB7093"];

  //선택된 날짜 
  useEffect(()=>{
    setDate(selectedDate);
  },[])

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
      date: date,
    };

    //새로운 사람 저장
    saveData([...people, newPerson]);

    //currentIndex 저장
    saveCurrentIndex(currentIndex + 1);

    closeModal();
  };

  return (
    <div className="modal">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <p>
        선택한 날짜: {month}월 {day}일
      </p>
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
