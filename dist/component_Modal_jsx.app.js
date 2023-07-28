"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkproject"] = self["webpackChunkproject"] || []).push([["component_Modal_jsx"],{

/***/ "./component/Modal.jsx":
/*!*****************************!*\
  !*** ./component/Modal.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _hooks_LoadStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/LoadStorage */ \"./hooks/LoadStorage.jsx\");\n/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ \"./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js\");\n__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ \"./node_modules/react-refresh/runtime.js\");\n\nvar _s = __webpack_require__.$Refresh$.signature();\n\n\n\n__webpack_require__.e(/*! import() */ \"css_modal_css\").then(__webpack_require__.bind(__webpack_require__, /*! ../css/modal.css */ \"./css/modal.css\"));\nconst Modal = _ref => {\n  _s();\n  let {\n    closeModal,\n    selectedDate,\n    setNullSelectedDays\n  } = _ref;\n  const [dates, setDates] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n  const {\n    data,\n    saveData\n  } = (0,_hooks_LoadStorage__WEBPACK_IMPORTED_MODULE_1__.LoadStorage)({\n    initialDataKey: \"userDataAndIndex\"\n  });\n  const userData = data.userData;\n  const currentIndex = data.currentIndex;\n  const colors = [\"#D2D0F7\", \"#B2D4D1\", \"#D9EBD1\", \"#D4CCB2\", \"#DB7093\", \"#A1CCD1\", \"#E9B384\", \"#7C9D96\"];\n\n  //선택된 날짜\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (selectedDate && selectedDate.length > 0) {\n      setDates([...selectedDate]);\n    }\n  }, [selectedDate]);\n\n  // 날짜 포맷화 함수\n  const formatDate = dateString => {\n    const date = new Date(dateString);\n    const year = date.getFullYear();\n    const month = date.getMonth() + 1;\n    const day = date.getDate();\n    return `${year}. ${month}. ${day}`;\n  };\n  //이름 입력할 때\n  const handleNameChange = event => {\n    setName(event.target.value);\n  };\n\n  //색상 할당\n  const assignColor = () => {\n    const assignedColor = colors[currentIndex % colors.length];\n    return assignedColor;\n  };\n\n  //제출\n  const handleSubmit = event => {\n    event.preventDefault();\n\n    // userData 배열에서 이름이 이미 존재하는지 확인\n    const existingPersonIndex = userData.findIndex(person => person.name === name);\n    // 날짜를 UTC로 변환하여 저장\n    const utcDates = dates.map(date => new Date(date).toISOString());\n    if (existingPersonIndex !== -1) {\n      // 이름이 있으면 업데이트\n      const updatedUserData = [...userData];\n      const existingPerson = updatedUserData[existingPersonIndex];\n      existingPerson.date = [...existingPerson.date, ...dates]; //날짜 추가\n      saveData({\n        userData: updatedUserData\n      });\n    } else {\n      // 이름이 없으면 새로운 객체 생성\n      const newPerson = {\n        name: name,\n        color: assignColor(),\n        date: utcDates\n      };\n\n      // 새로운 사람 추가\n      saveData({\n        userData: [...userData, newPerson],\n        currentIndex: currentIndex + 1\n      });\n    }\n    closeModal();\n    setNullSelectedDays();\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"modalContainer\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"modal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"modalHead\"\n  }, dates && dates.length === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, formatDate(dates[0])) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, formatDate(dates[0]), \" ~ \", formatDate(dates[dates.length - 1])), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", {\n    className: \"close\",\n    onClick: closeModal\n  }, \"\\xD7\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    id: \"modalForm\",\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    id: \"modalNameArea\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"text\",\n    placeholder: \"\\uC774\\uB984 \\uC785\\uB825 \\uD6C4 +\\uB97C \\uB20C\\uB7EC\\uC8FC\\uC138\\uC694 \",\n    value: name,\n    onChange: handleNameChange\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    id: \"addBtn\",\n    type: \"submit\"\n  }, \"+\"))));\n};\n_s(Modal, \"2JdC1vYJ7b2zOAqxsOS4gpbTpOk=\");\n_c = Modal;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);\nvar _c;\n__webpack_require__.$Refresh$.register(_c, \"Modal\");\n\nconst $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;\nconst $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(\n\t$ReactRefreshModuleId$\n);\n\nfunction $ReactRefreshModuleRuntime$(exports) {\n\tif (false) {}\n}\n\nif (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {\n\t$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);\n} else {\n\t$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);\n}\n\n//# sourceURL=webpack://project/./component/Modal.jsx?");

/***/ })

}]);