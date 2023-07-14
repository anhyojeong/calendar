const React = require('react');
const {useState, useEffect} = require('react');

const LoadPeople = ({ initialDataKey }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const savedData = localStorage.getItem(initialDataKey);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }, [initialDataKey]);
  
    const saveData = newData => {
      setData(newData);
      localStorage.setItem(initialDataKey, JSON.stringify(newData));
    };
  
    return { data, saveData };
  };


export {LoadPeople};