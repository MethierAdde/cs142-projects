import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link } from "react-router-dom";
import "./p5.css";

import Header from "./components/Header";
import States from "./components/States";
import Example from "./components/Example";

class Router extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <HashRouter>
            <div>
                <Link className = "link" to="/States">States</Link>
                <Link className = "link" to = "/Example">Example</Link>
            </div>
                <Route path="/States" component = {States}/>
                <Route path="/Example" component = {Example}/>
            </HashRouter>
        </div>
    }
}

ReactDOM.render(<div className="container"><Header /><Router /></div>, document.getElementById("reactapp"));