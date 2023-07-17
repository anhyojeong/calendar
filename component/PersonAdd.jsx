const React = require("react");
const { useState, useEffect } = require("react");
const { LoadStorage } = require("./LoadStorage");
require("../css/personArea.css");

const PersonAdd = () => {
  const [people, setPeople] = useState([]);
  const { data, saveData } = LoadStorage({
    initialDataKey: "userDataAndIndex",
  });

  // 로컬스토리지에서 저장된 정보를 가져옴
  useEffect(() => {
    setPeople(data.userData);
  }, [data.userData]);

  return (
    <div id="savedPeopleArea">
      {people.length > 0
        ? people.map((person, index) => (
            <div className="savedPersonName" key={index}>
              <span style={{ backgroundColor: person.color }}>
                {person.name}
              </span>
            </div>
          ))
        : null}
    </div>
  );
};

module.exports = PersonAdd;
