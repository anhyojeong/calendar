/* import React from "react";
import {useState,useEffect } from "react";
import { LoadStorage } from"../hooks/LoadStorage";
import ("../css/modal.css"); */
const React = require("react");
const { useState, useEffect} = require("react");
const { LoadStorage } = require("../hooks/LoadStorage");
require("../css/modal.css");

const Modal = ({ closeModal, selectedDate, setNullSelectedDays }) => {
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

  // 날짜 포맷화 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}. ${month}. ${day}`;
  };
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
    // 날짜를 UTC로 변환하여 저장
    const utcDates = dates.map((date) => new Date(date).toISOString());

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
        date: utcDates,
      };

      // 새로운 사람 추가
      saveData({
        userData: [...userData, newPerson],
        currentIndex: currentIndex + 1,
      });
    }

    closeModal();
    setNullSelectedDays();
  };

  return (
    <div className="modalContainer">
      <div id="modal">
        <div id="modalHead">
          {dates && dates.length === 1 ? (
            <p>{formatDate(dates[0])}</p>
          ) : (
            <p>
              {formatDate(dates[0])} ~ {formatDate(dates[dates.length - 1])}
            </p>
          )}
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <form id="modalForm" onSubmit={handleSubmit}>
          <div id ="modalNameArea">
            <input
              type="text"
              placeholder="이름 입력 후 +를 눌러주세요 "
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <button id="addBtn" type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

//export default Modal;
module.exports = Modal;

