const React = require("react");
const { useState, useEffect } = require("react");

const LoadStorage = ({ initialDataKey }) => {
  const [data, setData] = useState({ userData: [], currentIndex: 0 });

    useEffect(() => {
      const savedData = localStorage.getItem(initialDataKey);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }, [initialDataKey]);
 

  const saveData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    localStorage.setItem(
      initialDataKey,
      JSON.stringify({ ...data, ...newData })
    );
  };

  return { data, saveData };
};

export { LoadStorage };
