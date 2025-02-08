import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";

import Example from "./components/Example";
import Header from "./components/Header";

ReactDOM.render(<div><Header /><Example /></div>, document.getElementById("reactapp"));
