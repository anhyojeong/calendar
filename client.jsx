const React = require("react");
const ReactDom = require("react-dom/client");
const Header = require("./Header");

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<Header />);
