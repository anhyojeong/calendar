"use strict";
(self["webpackChunkproject"] = self["webpackChunkproject"] || []).push([["component_Modal_jsx"],{

/***/ "./component/Modal.jsx":
/*!*****************************!*\
  !*** ./component/Modal.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_LoadStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/LoadStorage */ "./hooks/LoadStorage.jsx");



__webpack_require__.e(/*! import() */ "css_modal_css").then(__webpack_require__.bind(__webpack_require__, /*! ../css/modal.css */ "./css/modal.css"));
/*const React = require("react");
const { useState, useEffect} = require("react");
const { LoadStorage } = require("../hooks/LoadStorage");
require("../css/modal.css");*/

const Modal = _ref => {
  let {
    closeModal,
    selectedDate,
    setNullSelectedDays
  } = _ref;
  //const [dates, setDates] = useState(selectedDate);
  const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    data,
    saveData
  } = (0,_hooks_LoadStorage__WEBPACK_IMPORTED_MODULE_1__.LoadStorage)({
    initialDataKey: "userDataAndIndex"
  });
  const userData = data.userData;
  const currentIndex = data.currentIndex;
  const colors = ["#D2D0F7", "#B2D4D1", "#D9EBD1", "#D4CCB2", "#DB7093", "#A1CCD1", "#E9B384", "#7C9D96"];

  //선택된 날짜
  // useEffect(() => {
  //   if (selectedDate && selectedDate.length > 0) {
  //     setDates([...selectedDate]);
  //   }
  // }, [selectedDate]);

  // 날짜 포맷화 함수
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}. ${month}. ${day}`;
  };
  //이름 입력할 때
  const handleNameChange = event => {
    setName(event.target.value);
  };

  //색상 할당
  const assignColor = () => {
    const assignedColor = colors[currentIndex % colors.length];
    return assignedColor;
  };

  //제출
  const handleSubmit = event => {
    event.preventDefault();

    // userData 배열에서 이름이 이미 존재하는지 확인
    const existingPersonIndex = userData.findIndex(person => person.name === name);
    // 날짜를 UTC로 변환하여 저장
    const utcDates = selectedDate.map(date => new Date(date).toISOString());
    if (existingPersonIndex !== -1) {
      // 이름이 있으면 업데이트
      const updatedUserData = [...userData];
      const existingPerson = updatedUserData[existingPersonIndex];
      existingPerson.date = [...existingPerson.date, ...selectedDate]; //날짜 추가 !!!!!!!!!!!!!!!!!!!!!
      saveData({
        userData: updatedUserData
      });
    } else {
      // 이름이 없으면 새로운 객체 생성
      const newPerson = {
        name: name,
        color: assignColor(),
        date: utcDates
      };

      // 새로운 사람 추가
      saveData({
        userData: [...userData, newPerson],
        currentIndex: currentIndex + 1
      });
    }
    closeModal();
    setNullSelectedDays();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "modalContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "modalHead"
  }, selectedDate && selectedDate.length === 1 ?
  /*#__PURE__*/
  ///////////////!!!!!!!!!!!!!!!!!!
  react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, formatDate(selectedDate[0])) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, formatDate(selectedDate[0]), " ~ ", formatDate(selectedDate[selectedDate.length - 1])), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "close",
    onClick: closeModal
  }, "\xD7")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    id: "modalForm",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "modalNameArea"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "\uC774\uB984 \uC785\uB825 \uD6C4 +\uB97C \uB20C\uB7EC\uC8FC\uC138\uC694 ",
    value: name,
    onChange: handleNameChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    id: "addBtn",
    type: "submit"
  }, "+"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);
//module.exports = Modal;

/***/ })

}]);
//# sourceMappingURL=component_Modal_jsx.app.js.map